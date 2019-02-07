import { Component, OnInit, OnDestroy } from '@angular/core';

import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  recipe: Recipe;
  recipeIndex: number = null;
  recipeSubscription: Subscription;

  ngOnInit() {
   this.recipeSubscription = this.route.data.subscribe((data: Recipe) => {
     this.recipe = data['recipe'];
     this.recipeIndex = this.recipeService.getIndexOfRecipe(this.recipe);
   });
  }

  ingredientsToShoppingList() {
    const newIngredients = JSON.parse(JSON.stringify(this.recipe.ingredients));
    this.recipeService.ingredientsToShoppingList(newIngredients);
  }

  onDeleteRecipe(recipeIndex: number) {
    this.recipeService.deleteRecipe(recipeIndex);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
