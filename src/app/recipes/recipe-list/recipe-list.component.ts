import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import Recipe from '../recipe.model';
import * as RecipeActions from './../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
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

  ngOnInit() {
    this.recipeStateSub = this.recipeStore
      .select('recipes')
      .subscribe((state: fromRecipe.State) => {
        this.recipes = state.recipes;
        this.initialFetchingDone = state.initialFetchingDone;
        this.showSpinner = state.showSpinner;
      });

    if (!this.initialFetchingDone) {
      this.recipeStore.dispatch(new RecipeActions.FetchRecipes());
    }

    this.isAuthenticated = this.authStore.select(fromAuth.getAuthenticated);
  }

  ngOnDestroy() {
    this.recipeStateSub.unsubscribe();
  }
}
