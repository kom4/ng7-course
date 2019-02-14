import { Injectable } from '@angular/core';

import Recipe from './recipe.model';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable()

export class RecipeService {

  constructor(
    private shoppingListService: ShoppingListService,
    private http: Http
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
      new Recipe (
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
    this.recipeChangesSub.next(this.recipes);
  }

  updateRecipe(recipeIndex: number, recipe: Recipe) {
    this.recipes[recipeIndex] = recipe;
    this.recipeChangesSub.next(this.recipes);
  }

  createRecipe(recipe: Recipe): number {
    this.recipes.push(recipe);
    this.recipeChangesSub.next(this.recipes);
    return this.recipes.length - 1;
  }

  removeIngredientFromRecipe(recipeIndex: number, ingredientIndex: number) {
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);
  }

  saveRecipesToDatabase() {
   return this.http.post('https://recipeapp-4444.firebaseio.com/recipes.json', this.recipes);
  }

  fetchRecipesFromDatabase() {
    this.recipes = [];
    this.http.get('https://recipeapp-4444.firebaseio.com/recipes.json')
      .pipe(
        map((recipe) => {
         return recipe.json();
        })
      ).subscribe(recipes => this.recipes = recipes);

   }


}
