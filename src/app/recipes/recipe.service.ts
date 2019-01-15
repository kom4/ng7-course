import { EventEmitter, Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<Recipe>();

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
        new Ingredient('Onion', 2)
      ])
  ];

  getRecipes() {
    return [...this.recipes];
  }

  ingredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.setIngredients(ingredients);
  }

}
