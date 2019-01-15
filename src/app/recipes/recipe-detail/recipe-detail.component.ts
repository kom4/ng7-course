import { Component, Input } from '@angular/core';

import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {

  constructor(private recipeService: RecipeService) { }

  @Input () recipe: Recipe;

  ingredientsToShoppingList() {
    this.recipeService.ingredientsToShoppingList(this.recipe.ingredients);
  }

}
