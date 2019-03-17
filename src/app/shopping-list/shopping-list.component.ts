import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromShoppingList.AppState>) {}

  selectedIngredient: number = null;
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  addedNewIngredient: boolean;
  storeSubscription: Subscription;

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    this.storeSubscription = this.store.select('shoppingList').subscribe(data => {
      this.selectedIngredient = data.editedIngredientIndex;
      this.addedNewIngredient = data.addedNewIngredient;
    });
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetEditedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.HighlightNewIngredient(false));
    this.storeSubscription.unsubscribe();
  }

}
