import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import Recipe from '../recipe.model';
import Ingredient from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromRecipe.RecipeState>,
    private router: Router
  ) {}

  /*---------------------Fetching recipes from server---------------------*/
  @Effect() fetchRecipes$ = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      this.store.dispatch(new RecipeActions.ShowSpinner());
      return this.http
        .get<Recipe[]>('https://recipeapp-4444.firebaseio.com/recipes.json')
        .pipe(
          map(recipes => {
            if (recipes !== null) {
              return recipes.map(recipe => {
                if (recipe.ingredients) {
                  recipe.ingredients = recipe.ingredients.map(ingredient => {
                    return new Ingredient(ingredient.name, ingredient.amount);
                  });
                }
                return recipe;
              });
            } else {
              return null;
            }
          })
        );
    }),
    map((recipes: Recipe[]) => {
      return new RecipeActions.ImportRecipes(recipes);
    })
  );

  /*---------------------Saving recipes to server---------------------*/
  @Effect({ dispatch: false }) saveToServer$ = this.actions$.pipe(
    ofType(RecipeActions.SAVE_RECIPES_TO_SERVER),
    map(() => {
      this.store
        .select(fromRecipe.getRecipes)
        .pipe(take(1))
        .subscribe(recipes => {
          this.http
            .put('https://recipeapp-4444.firebaseio.com/recipes.json', recipes)
            .pipe(take(1))
            .subscribe();
        });
    })
  );

  /*---------------------Redirect after adding new recipe---------------------*/
  @Effect({ dispatch: false }) addRecipe$ = this.actions$.pipe(
    ofType(RecipeActions.ADD_RECIPE),
    tap(() => {
      this.store
        .select(fromRecipe.getRecipes)
        .pipe(
          take(1),
          map((recipes: Recipe[]) => {
            return recipes.length - 1;
          })
        )
        .subscribe((lastItemindex: number) => {
          this.router.navigate(['/recipes', lastItemindex]);
        });
    })
  );

  /*---------------------Redirect after updating a recipe---------------------*/
  @Effect({ dispatch: false }) updateRecipe$ = this.actions$.pipe(
    ofType(RecipeActions.UPDATE_RECIPE),
    map((recipeInfo: any) => {
      this.router.navigate(['/recipes', recipeInfo.payload.index]);
    })
  );
}
