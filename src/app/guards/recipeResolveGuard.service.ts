import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import Recipe from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class RecipeResolver implements Resolve<any> {

  recipe = new Subject<Recipe>();

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  resolve (route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id');
    const recipe = this.recipeService.getSingleRecipe(id);
    if (recipe === null) {
      this.router.navigate(['recipes']);
    }
    return recipe;
  }

}
