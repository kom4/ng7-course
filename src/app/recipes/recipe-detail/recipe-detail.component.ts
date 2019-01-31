import { Component, Input, OnInit } from '@angular/core';

import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  recipe: Recipe;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.recipe = this.recipeService.getSingleRecipe(+params.get('id'));
    });
  }

  ingredientsToShoppingList() {
    this.recipeService.ingredientsToShoppingList(this.recipe.ingredients);
  }

}
