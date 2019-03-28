import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [

    trigger('fadeIn', [
      state('normal', style({
        'transform': 'scale(1)',
      })),
    transition(':enter', [
      style({
        'transform': 'scale(0)',
      }),
      animate(200)
    ])
    ]),

    trigger('moveIn', [
      state('normal', style({
        'transform': 'translateX(0px)',
        'opacity': 1
      })),
      transition('void => normal', [
        style({
          'transform': 'translateX(-100px)',
          'opacity': 0
        }),
        animate(500)
      ]),
      transition(':leave', [
        group([
          animate('0.5s ease-in', style({'transform': 'translateX(100px)', 'padding': 0, 'margin': 0, 'height': '0px', 'opacity': 0, 'background-color': 'red'
        }))
        ])
      ])
    ])

  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  selected$: Observable<number>;
  ingredients$: Observable<Ingredient[]>;
  addedNewIngredient$: Observable<number>;
  updatedOldIngredient$: Observable<number>;

  ngOnInit() {
    this.ingredients$ = this.store.select(fromShoppingList.getIngredients);
    this.selected$ = this.store.select(fromShoppingList.getSelectedIngredientIndex);
    this.addedNewIngredient$ = this.store.select(fromShoppingList.getAddedNewIngredient);
    this.updatedOldIngredient$ = this.store.select(fromShoppingList.getUpdatedOldIngredient);
  }

  setSelected(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(null));
  }

}
