import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  recipe: Recipe;
  recipeSubscription: Subscription;

  ngOnInit() {
    this.recipeSubscription = this.route.paramMap.subscribe((params) => {
      this.recipe = this.recipeService.getSingleRecipe(+params.get('id'));
    });
  }

  ingredientsToShoppingList() {
    this.recipeService.ingredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
