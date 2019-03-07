import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService) { }

  recipes: Recipe[];
  recipeSubscription: Subscription;
  isAuthenticated: boolean;
  authSubscription: Subscription;

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeChangesSub.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.isAuthenticated = this.authService.isAuthenticated();
    this.authSubscription = this.authService.authenticationChange.subscribe(
      () => {
        this.isAuthenticated = this.authService.isAuthenticated();
      }
    );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
