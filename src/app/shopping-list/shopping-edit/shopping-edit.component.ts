import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromShoppingList.AppState>,
    ) { }

  @ViewChild('form') form: NgForm;
  selectedIngredient = null;
  storeSubscription: Subscription;
  ingredient: Ingredient;

  ngOnInit() {
    this.storeSubscription = this.store.select('shoppingList').subscribe(data => {
      this.ingredient = data.editedIngredient;
      this.selectedIngredient = data.editedIngredientIndex;
      if (this.selectedIngredient !== null) {
        this.form.setValue({
          'name': this.ingredient.name,
          'amount': this.ingredient.amount
        });
      }
    });

  }

  ingredientHandler(form: NgForm) {
    if (this.selectedIngredient === null) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(
        form.value.name,
        form.value.amount
      )));
    } else if ((this.ingredient.name.toLowerCase() === form.value.name.toLowerCase()) || (this.checkIfNameIsTaken(form.value.name) === -1)) {
      this.ingredient = new Ingredient(form.value.name, form.value.amount);
      this.store.dispatch(new ShoppingListActions.HighlightNewIngredient(false)); 
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.selectedIngredient, ingredient: this.ingredient}));
    }
    this.clear();
  }

  checkIfNameIsTaken(name: string): number {
    let ingredients: Ingredient[];
    this.store.select('shoppingList').subscribe(data => ingredients = data.ingredients);
    return ingredients.findIndex((ing) => {
      return name.toLowerCase() === ing.name.toLowerCase();
    });
  }


  clear() {
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.SetEditedIngredient(null));
  }

  deleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.selectedIngredient));
    this.store.dispatch(new ShoppingListActions.HighlightNewIngredient(false));
    this.clear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetEditedIngredient(null));
    this.storeSubscription.unsubscribe();
  }


}
