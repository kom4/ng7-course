import { Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { Subject,  } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {

  constructor(
    private httpClient: HttpClient
  ) {}

  recipeChangesSub = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  loadedContentChange = new Subject<number>();

  getRecipes() {
    if (this.recipes.length === 0) {
      this.fetchRecipesFromDatabase();
    }
    return [...this.recipes];
  }

  getSingleRecipe(id: number): Recipe {
    if (id < this.recipes.length) {
      return JSON.parse(JSON.stringify(this.recipes[id]));
    }
    return null;
  }

  getIndexOfRecipe(recipe: Recipe): number {
    return this.recipes.findIndex((rec) => {
      return recipe === rec;
    });
  }

  deleteRecipe(recipeIndex: number) {
    this.recipes.splice(recipeIndex, 1);
    this.recipeChangesSub.next(this.recipes.slice());
  }

  updateRecipe(recipeIndex: number, recipe: Recipe) {
    this.recipes[recipeIndex] = recipe;
    this.recipeChangesSub.next(this.recipes.slice());
  }

  createRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.recipeChangesSub.next(this.recipes.slice());
    return this.recipes.length - 1;
  }

  removeIngredientFromRecipe(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  }

  saveRecipesToDatabase() {
    return this.httpClient.put('https://recipeapp-4444.firebaseio.com/recipes.json', this.recipes);
  }

  fetchRecipesFromDatabase() {
    this.httpClient.get<Recipe[]>('https://recipeapp-4444.firebaseio.com/recipes.json')
      .pipe(map((recipes) => {
        return recipes.map((recipe) => {
          if (recipe.ingredients) {
            recipe.ingredients = recipe.ingredients.map((ingredient) => {
              return new Ingredient(ingredient.name, ingredient.amount);
            });
          }
          return recipe;
        });
      }))
        .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;
          this.recipeChangesSub.next(this.recipes.slice());
        });
  }



}
