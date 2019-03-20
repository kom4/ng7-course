import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  shoppingListStateSubscription: Subscription;
  selected: number = null;
  ingredients: Ingredient[];
  addedNewIngredient = null;

  ngOnInit() {
    this.shoppingListStateSubscription = this.store.select('shoppingList').subscribe(
      (state) => {
        this.ingredients = state.ingredients;
        this.selected = state.selectedIngredientIndex;
        this.addedNewIngredient = state.addedNewIngredient;
      }
    );
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
    this.shoppingListStateSubscription.unsubscribe();
  }


}
