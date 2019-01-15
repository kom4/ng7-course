import Ingredient from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {

  selectedIngredient: number = null;
  addNewIngredient = new EventEmitter<any>();
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Salad', 4),

    // new Ingredient('Potato', 2),
    // new Ingredient('Apples', 5),
    // new Ingredient('Tomatoes', 10),
    // new Ingredient('Carrot', 6)
  ];

  newIngredientToDatabase(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addNewIngredient.emit();
    this.ingredientsChanged.emit(this.ingredients);
  }

  getIngredients() {
    return [...this.ingredients];
  }

  setIngredients(newIngredients: Ingredient[]) {

    let ingredient: Ingredient;

    this.ingredients.map((oldIng) => {

      ingredient = newIngredients.find((newIng) => {
        return oldIng.name === newIng.name;
      });

      console.log(ingredient);


     });

    // this.ingredients = newIngredients;
    // console.log(
    //  this.ingredients.find((ing) => {

    //   return ing.amount = 2;
    // }));



  }


}
