import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(
    private shoppingListService: ShoppingListService
    ) { }

  selectedIngredient = null;
  selectedSubscription: Subscription;
  ingredientName = null;
  ingredientAmount = null;

  ngOnInit() {
    this.selectedSubscription = this.shoppingListService.selectedIngredient.subscribe((index) => {
      if (index !== null) {
        this.selectedIngredient = index;
        const ingredient = this.shoppingListService.getSingleIngredient(index);
        this.ingredientName = ingredient.name;
        this.ingredientAmount = ingredient.amount;
      } else {
        this.selectedIngredient = null;
      }
    });
  }

  addNewIngredientHandler(form: NgForm) {
    if (this.selectedIngredient === null) {
      this.shoppingListService.
        newIngredientToDatabase(new Ingredient(
          form.value.name,
          form.value.amount
        ));
      form.reset();
    } else {
      this.shoppingListService.editIngredients(form.value.name, form.value.amount, this.selectedIngredient);
      this.ingredientName = null;
      this.ingredientAmount = null;
    }
  }


  clear(form: NgForm) {
    form.reset();
    this.shoppingListService.selectedIngredient.next(null);
  }


  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
    this.ingredientName = null;
    this.ingredientAmount = null;
  }


  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }

}
