import { Component, OnInit, OnDestroy } from '@angular/core';

import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  recipe: Recipe;
  recipeIndex: number = null;
  recipeSubscription: Subscription;
  isAuthenticated: boolean;
  authSubscription: Subscription;

  ngOnInit() {
    this.recipeSubscription = this.route.data.subscribe((data: Recipe) => {
      [this.recipe, this.recipeIndex] = data['recipeData'];
    });
    this.isAuthenticated = this.authService.isAuthenticated();
    this.authSubscription = this.authService.authenticationChange.subscribe(
      () => {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    );

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
    this.authSubscription.unsubscribe();
  }

}
