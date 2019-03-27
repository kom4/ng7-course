import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import Recipe from '../recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from './../store/recipe.actions';
import { State } from '../../auth/store/auth.reducers';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  recipe: Recipe;
  recipeIndex: number = null;
  recipeSubscription: Subscription;
  isAuthenticated: Observable<boolean>;

  ngOnInit() {
    this.recipeSubscription = this.route.data.subscribe((data: Recipe) => {
      [this.recipe, this.recipeIndex] = data['recipeData'];
    });

    this.isAuthenticated = this.store.select('auth').pipe(map((authState: State) => {
      return authState.authenticated;
    }));

  }

  ingredientsToShoppingList() {
    const newIngredients = JSON.parse(JSON.stringify(this.recipe.ingredients));
    this.store.dispatch(new ShoppingListActions.AddIngredients(newIngredients));
  }

  onDeleteRecipe() {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeIndex));
      this.router.navigate(['/recipes']);
    }
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
