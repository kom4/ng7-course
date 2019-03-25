import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../recipes/store/recipe.reducers';
import Recipe from '../recipes/recipe.model';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class RecipeResolver implements Resolve<any> {
  recipe: Recipe;

  constructor(
    private store: Store<fromRecipe.RecipeState>,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id');
    this.store
      .select('recipes')
      .pipe(
        map((state: fromRecipe.State) => {
          return state.recipes[id];
        }),
        take(1)
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });

    if (!this.recipe) {
      this.router.navigate(['recipes']);
    }

    return [this.recipe, id];
  }
}
