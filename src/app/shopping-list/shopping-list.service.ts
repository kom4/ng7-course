import Ingredient from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

  selectedIngredient = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  addNewIngredient = new Subject<number>();

  private ingredients: Ingredient[] = [];

  newIngredientToDatabase(ingredient: Ingredient) {
    const index = this.ingredients.findIndex((ing) => {
      return ing.name.toLowerCase() === ingredient.name.toLowerCase();
    });
    if (index > -1) {
      this.ingredients[index].amount += ingredient.amount;
      this.addNewIngredient.next(index);
    } else {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients);
    }
  }

  getIngredients() {
    return [...this.ingredients];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);
    this.selectedIngredient.next(null);
  }

  setIngredients(newIngredients: Ingredient[]) {

    if (this.ingredients.length === 0) {
      this.ingredients = newIngredients;
      return;
    }

    this.ingredients.forEach((oldIng, index) => {

      const newIngIndex = newIngredients.findIndex((newIng) => {
        return oldIng.name.toLowerCase() === newIng.name.toLowerCase();
      });

      if (newIngIndex >= 0) {
        this.ingredients[index].amount += newIngredients[newIngIndex].amount;
      }

    });

    newIngredients.forEach((newIng) => {
      const oldIngIndex = this.ingredients.findIndex((oldIng) => {
        return newIng.name.toLowerCase() === oldIng.name.toLowerCase();
      });

      if (oldIngIndex < 0 ) {
        this.ingredients.push(newIng);
      }
    });

  }


}
