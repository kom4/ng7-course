import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  selected$: Observable<number>;
  ingredients$: Observable<Ingredient[]>;
  addedNewIngredient$: Observable<number>;

  ngOnInit() {
    this.ingredients$ = this.store.select(fromShoppingList.getIngredients);
    this.selected$ = this.store.select(fromShoppingList.getSelectedIngredientIndex);
    this.addedNewIngredient$ = this.store.select(fromShoppingList.getAddedNewIngredient);
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
  }

}
