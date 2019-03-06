import { Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class RecipeService {

  constructor(
    private shoppingListService: ShoppingListService,
    private http: Http,
    private authService: AuthService
  ) {}

  recipeChangesSub = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes() {
    if (this.recipes.length === 0) {
      this.fetchRecipesFromDatabase();
    }
    return [...this.recipes];
  }

  ingredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.setIngredients(ingredients);
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
    const token = this.authService.getToken();
    return this.http.put('https://recipeapp-4444.firebaseio.com/recipes.json?auth=' + token, this.recipes);
  }

  fetchRecipesFromDatabase() {
    this.http.get('https://recipeapp-4444.firebaseio.com/recipes.json')
      .pipe(map((response: Response) => {
        return (<Recipe[]>response.json()).map((recipe) => {
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
