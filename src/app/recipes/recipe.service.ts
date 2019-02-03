import { Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {

  constructor(
    private shoppingListService: ShoppingListService
  ) {}

  recipeChangesSub = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe (
      'A delicious hamburger',
      'This is simply a testing recipe',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1024px-RedDot_Burger.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Salad', 3),
        new Ingredient('Cheese', 2)
      ]),
      new Recipe(
        'A fresh potato salad',
        'Second recipe',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/PotatoSalad.jpg/220px-PotatoSalad.jpg',
      [
        new Ingredient('Potato', 4),
        new Ingredient('Tomato', 3),
        new Ingredient('Onion', 2),
        new Ingredient('Meat', 6)
      ])
  ];

  getRecipes() {
    return [...this.recipes];
  }

  ingredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.setIngredients(ingredients);
  }

  getSingleRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  getIndexOfRecipe(recipe: Recipe): number {
    return this.recipes.findIndex((rec) => {
      return recipe === rec;
    });
  }

  deleteRecipe(recipeIndex: number) {
    this.recipes.splice(recipeIndex, 1);
    this.recipeChangesSub.next(this.recipes);
  }

  updateRecipe(recipeIndex: number, recipe: Recipe) {
    this.recipes[recipeIndex] = recipe;
    this.recipeChangesSub.next(this.recipes);
  }

  removeIngredientFromRecipe(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);

  }

}
