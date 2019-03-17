import { Component, OnInit, OnDestroy } from '@angular/core';
import Recipe from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

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
    private authService: AuthService,
    private store: Store<fromShoppingList.AppState>
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
    this.store.dispatch(new ShoppingListActions.AddIngredients(newIngredients));
  }

  onDeleteRecipe(recipeIndex: number) {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(recipeIndex);
      this.router.navigate(['/recipes']);
    }
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
