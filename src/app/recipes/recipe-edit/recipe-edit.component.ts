import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  recipeSubscription: Subscription;
  recipeIndex: number = null;
  addingNewIngredient = false;
  lastIngredientChanges: Subscription;
  ingredientNames: string[] = [];

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

  canDeactivate() {
    if (this.recipe.name === this.form.get('name').value &&
        this.recipe.description === this.form.get('description').value &&
        this.recipe.imagePath === this.form.get('imagePath').value &&
        JSON.stringify(this.recipe.ingredients) === JSON.stringify(this.getFormIngredients())) {
          return true;
    } else {
      return window.confirm('Discharge all the changes?');
    }
  }


  initializeFormForEditing() {
    this.recipeSubscription = this.route.data.subscribe((data: Recipe) => {
      [this.recipe, this.recipeIndex] = data['recipeData'];
    });
    this.imagePath = this.recipe.imagePath;
    const ingredients = this.recipe.ingredients;
    let ingredientsControls: FormGroup[] = [];
    if (ingredients) {
      ingredientsControls = ingredients.map((ing: Ingredient) => {
      return new FormGroup({
        'ingredientName': new FormControl(ing.name),
        'ingredientAmount': new FormControl(ing.amount)
      });
    });
  }

    this.form = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath),
      'description': new FormControl(this.recipe.description, Validators.required),
      'ingredients': new FormArray(ingredientsControls)
    });

    (<FormArray>this.form.get('ingredients')).controls.forEach((ing: FormGroup, index: number) => {
      ing.get('ingredientName').setValidators([Validators.required, this.isIngredientNameTaken.bind(this, index, true)]);
      ing.get('ingredientAmount').setValidators([Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]);
      ing.get('ingredientAmount').valueChanges.subscribe((status) => {
       this.updateFormArrayValidity();
      });
    });
  }


  updateFormArrayValidity() {
    this.form.get('ingredients').updateValueAndValidity();
  }


  isIngredientNameTaken(indexToIgnore: number, valid: boolean, control: FormControl): {[s: string]: boolean} {
    if (control.value !== null) {
      this.ingredientNames = [];
      let arrayLength = (<FormArray>this.form.get('ingredients')).controls.length;
      if (!valid) {
        --arrayLength;
      }
      (<FormArray>this.form.get('ingredients')).controls.forEach((ing: FormGroup, i: number) => {
        if (i < arrayLength && i !== indexToIgnore) {
          const ingredientName = <FormControl>ing.get('ingredientName');
          if (ingredientName.valid) {
            this.ingredientNames.push(ingredientName.value);
          }
        }
      });
      const index = this.ingredientNames.findIndex((name: string) => {
        return control.value.toLowerCase() === name.toLowerCase();
      });
      if (index >= 0) {
        return {'nameIsTaken': true};
      }
    }
    return null;
  }


  initializeFormForCreating() {
    this.recipe = new Recipe();
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'description': new FormControl(null, Validators.required),
      'ingredients': new FormArray([])
    });
  }


  onDeleteIngredient(ingredientIndex: number) {
    (<FormArray>this.form.get('ingredients')).controls.splice(ingredientIndex, 1);
    this.updateFormArrayValidity();
    this.addingNewIngredient = false;
  }


  onAddNewIngredient() {

    if (!this.addingNewIngredient) {
      this.addingNewIngredient = true;
      if (this.lastIngredientChanges)  {
        this.lastIngredientChanges.unsubscribe();
      }

    const length = (<FormArray>this.form.get('ingredients')).length;
    (<FormArray>this.form.get('ingredients')).controls.push(
      new FormGroup({
        'ingredientName': new FormControl(null, [Validators.required, this.isIngredientNameTaken.bind(this, length, false)]),
        'ingredientAmount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
      this.updateFormArrayValidity();
      this.lastIngredientChanges = (<FormArray>this.form.get('ingredients'))
        .controls[length].statusChanges.subscribe((status: string) => {
          this.updateFormArrayValidity();
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
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }


  get ingredientControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }


  getFormIngredients (): Ingredient[] {
    const ingredients: Ingredient[] = [];
    (<FormArray>this.form.get('ingredients')).controls.forEach((control: FormControl) => {
      if (control.valid) {
        ingredients.push(
          new Ingredient(
            control.get('ingredientName').value,
            control.get('ingredientAmount').value
          )
        );
      }
    });
    return ingredients;
  }


  onSubmit() {
    const ingredients = this.getFormIngredients();
    this.recipe = new Recipe(
      this.form.get('name').value,
      this.form.get('description').value,
      this.form.get('imagePath').value,
      ingredients
    );

    if (this.recipeIndex !== null) {
      this.recipeService.updateRecipe(this.recipeIndex, this.recipe);
      this.router.navigate(['/recipes', this.recipeIndex]);
    }

    if (this.recipeIndex === null) {
      const newRecipeIndex = this.recipeService.createRecipe(this.recipe);
      this.router.navigate(['recipes', newRecipeIndex]);
    }

  }


  onGetImage() {
    this.imagePath = (<HTMLTextAreaElement>document.querySelector('#imagePath')).value;
  }

}
