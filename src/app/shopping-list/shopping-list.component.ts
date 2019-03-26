import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import * as fromShoppingList from './store/shopping-list.reducers';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('moveIn', [
      state('moved', style({
        'transform': 'translateX(0px)',
        'opacity': 1
      })),
      transition('void => moved', [
        style({
          'transform': 'translateX(-100px)',
          'opacity': 0
        }),
        animate(200)
      ])
    ]),
    trigger('moveOut', [
      transition('* => void', [
        animate(200,  style({
          'transform': 'translateX(100px)',
          'opacity': 0,
          'background-color': 'red'
        }))
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  selected$: Observable<number>;
  ingredients$: Observable<Ingredient[]>;
  addedNewIngredient$: Observable<number>;
  removedIngredientIndex: Observable<number>;

  ngOnInit() {
    this.ingredients$ = this.store.select(fromShoppingList.getIngredients);
    this.selected$ = this.store.select(fromShoppingList.getSelectedIngredientIndex);
    this.addedNewIngredient$ = this.store.select(fromShoppingList.getAddedNewIngredient);
    this.removedIngredientIndex = this.store.select(fromShoppingList.getRemovedIngredientIndex);
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
  }

}
