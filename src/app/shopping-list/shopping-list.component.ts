import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import * as fromShoppingList from './store/shopping-list.reducers';
import { animations } from './shopping-list.animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [animations]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  selected$: Observable<number>;
  ingredients$: Observable<Ingredient[]>;
  addedNewIngredient$: Observable<number>;
  updatedOldIngredient$: Observable<number>;
  deletedIngredient: Subscription;
  isDeleted: number;
  hoverIndex: number = null;

  ngOnInit() {
    this.ingredients$ = this.store.select(fromShoppingList.getIngredients);
    this.selected$ = this.store.select(fromShoppingList.getSelectedIngredientIndex);
    this.addedNewIngredient$ = this.store.select(fromShoppingList.getAddedNewIngredient);
    this.updatedOldIngredient$ = this.store.select(fromShoppingList.getUpdatedOldIngredient);
    this.deletedIngredient = this.store.select(fromShoppingList.getDeletedIngredientIndex).subscribe((index) => {
      this.isDeleted = index;
      if (this.isDeleted !== null) {
        setTimeout(() => {
          this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        }, 200);
      }
    });
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
    this.deletedIngredient.unsubscribe();
  }

}
