import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import Ingredient from 'src/app/shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  form: FormGroup;
  recipe: Recipe;
  imagePath = '';
  imageChangesSub: Subscription;
  recipeIndex: number = null;
  addingNewIngredient = false;
  lastIngredientChanges: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.router.url.endsWith('edit')) {
      this.initializeFormForEditing();
    } else {
      this.initializeFormForCreating();
    }

    const imagePathElement = (<HTMLElement>document.querySelector('#imagePath'));
    ['keyup', 'keydown'].forEach((event) => {
      imagePathElement.addEventListener(event, (e: KeyboardEvent) => {
        if (!(e.ctrlKey && e.keyCode === 86 || e.keyCode === 46 || e.ctrlKey && e.keyCode === 67 || e.ctrlKey && e.keyCode === 88)) {
          e.preventDefault();
        }

      });
    });
  }

  initializeFormForEditing() {
    this.recipeIndex = +this.route.snapshot.paramMap.get('id');
    this.recipe = this.recipeService.getSingleRecipe(this.recipeIndex);
    this.imagePath = this.recipe.imagePath;
    const ingredients = this.recipe.ingredients;
    const ingredientsControls = ingredients.map((ing: Ingredient) => {
      return new FormGroup({
        'ingredientName': new FormControl(ing.name, Validators.required),
        'ingredientAmount': new FormControl(ing.amount, Validators.required)
      });
    });
    this.form = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingredients': new FormArray(ingredientsControls)
    });
  }


  initializeFormForCreating() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])
    });
  }


  onDeleteIngredient(ingredientIndex: number) {
    (<FormArray>this.form.get('ingredients')).controls.splice(ingredientIndex, 1);
    this.recipeService.removeIngredientFromRecipe(this.recipeIndex, ingredientIndex);
  }


  onAddNewIngredient() {
    if (!this.addingNewIngredient) {
      this.addingNewIngredient = true;
      if (this.lastIngredientChanges)  {
        this.lastIngredientChanges.unsubscribe();
      }
    (<FormArray>this.form.get('ingredients')).controls.push(
      new FormGroup({
        'ingredientName': new FormControl(null, Validators.required),
        'ingredientAmount': new FormControl(null, Validators.required)
      }));
      const length = (<FormArray>this.form.get('ingredients')).length;
      this.lastIngredientChanges = (<FormArray>this.form.get('ingredients'))
        .controls[length - 1].statusChanges.subscribe((status: string) => {
        if (status === 'VALID') {
          this.addingNewIngredient = false;
        } else {
          this.addingNewIngredient = true;
        }
      });
    }
    setTimeout(() => {
      const ingredientInputs = document.querySelectorAll('input[formControlname="ingredientName"]');
      (<HTMLElement>ingredientInputs[ingredientInputs.length - 1]).focus();
    } , 50);
  }


  onCancelEditForm() {
    if (this.recipeIndex !== null) {
      this.router.navigate(['/recipes', this.recipeIndex]);
    } else {
      this.router.navigate(['/recipes']);
    }
  }


  ngOnDestroy() {
    if (this.lastIngredientChanges)  {
      this.lastIngredientChanges.unsubscribe();
    }
  }


  onSubmit() {
    const ingredients: Ingredient[] = [];
    (<FormArray>this.form.get('ingredients')).controls.forEach((control: FormControl) => {
      ingredients.push(
        new Ingredient(
          control.get('ingredientName').value,
          control.get('ingredientAmount').value
        )
      );
    });
    this.recipe = new Recipe(
      this.form.get('name').value,
      this.form.get('description').value,
      this.form.get('imagePath').value,
      ingredients
    );
    this.recipeService.updateRecipe(this.recipeIndex, this.recipe);
    this.router.navigate(['/recipes', this.recipeIndex]);
  }


  onGetImage() {
    this.imagePath = (<HTMLTextAreaElement>document.querySelector('#imagePath')).value;
  }

}
