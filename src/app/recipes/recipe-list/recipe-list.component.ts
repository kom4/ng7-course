import { Component, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { trigger, style, state, transition, animate, query, stagger } from '@angular/animations';

import { AppState } from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import Recipe from '../recipe.model';
import * as RecipeActions from './../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  animations: [

      trigger('recipeListAnimation', [
        transition(':enter', [
          query('a', style({transform: 'translateX(-100%)', opacity: 0}), {optional: true}),
          query('a',
            stagger('200ms', [
              animate('300ms', style({transform: 'translateX(0px)', opacity: 1}))
          ]), {optional: true})
        ]),
      ]),
      trigger('moveOut', [
        transition(':leave', [
          query('a', style({backgroundColor: 'red'})),
          query('a', [
            animate('150ms ease-in', style({transform: 'scale(0)', height: 0, margin: 0, padding: 0}))
          ])
        ]),
        transition('void => moveIn', [
          query('a', style({transform: 'scale(0)'})),
          query('a', [
            animate('300ms ease-out', style({transform: 'scale(1)', backgroundColor: 'lightgreen'}))
          ])
        ])
       ]),
    ]

})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(
    private authStore: Store<AppState>,
    private recipeStore: Store<fromRecipe.RecipeState>
  ) {}

  recipeStateSub: Subscription;
  recipes: Recipe[];
  initialFetchingDone: boolean;
  isAuthenticated: Observable<boolean>;
  showSpinner: boolean;
  addedNewRecipe = false;

  ngOnInit() {
    this.recipeStateSub = this.recipeStore
      .select('recipes')
      .subscribe((state: fromRecipe.State) => {
        this.recipes = state.recipes;
        this.initialFetchingDone = state.initialFetchingDone;
        this.showSpinner = state.showSpinner;
        this.addedNewRecipe = state.addedNewRecipe;
      });

    if (!this.initialFetchingDone) {
      this.recipeStore.dispatch(new RecipeActions.FetchRecipes());
    }

    this.isAuthenticated = this.authStore.select(fromAuth.getAuthenticated);
  }

  clearIndex() {
    this.authStore.dispatch(new RecipeActions.ResetIndex());
  }

  ngOnDestroy() {
    this.recipeStateSub.unsubscribe();
  }
}
