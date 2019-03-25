import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observer, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import Ingredient from 'src/app/shared/ingredient.model';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import { take, first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) { }

  @ViewChild('form') form: NgForm;
  ingredientSub: Subscription;
  selectedIngredient: number;
  ingredient: Ingredient;
  nameIsTaken = false;


  ngOnInit() {
    this.ingredientSub = this.store.select('shoppingList').subscribe((state) => {
      this.selectedIngredient = state.selectedIngredientIndex;
      this.ingredient = state.selectedIngredient;
      if (this.ingredient !== null) {
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
      form.reset();
    } else {
      if ((this.ingredient.name.toLowerCase() === form.value.name.toLowerCase()) || (this.checkIfNameIsTaken(form.value.name) === -1)) {
        this.store.dispatch(new ShoppingListActions.UpdateIngredient(
          new Ingredient(form.value.name, form.value.amount)
        ));
        this.form.reset();
        this.nameIsTaken = false;
        return;
      } else {
        this.nameIsTaken = true;
      }
    }
  }

  clear() {
    this.form.reset();
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
    this.nameIsTaken = false;
  }

  deleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.form.reset();
    this.nameIsTaken = false;
  }

  checkIfNameIsTaken(name: string): number {
    let ingredients: Ingredient[];
    this.store.select('shoppingList').subscribe(data => {
      ingredients =  data.ingredients;
    });
    return ingredients.findIndex((ing) => {
      return name.toLowerCase() === ing.name.toLowerCase();
    });
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }

}
