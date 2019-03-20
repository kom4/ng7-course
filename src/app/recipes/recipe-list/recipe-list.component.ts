import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeService } from '../recipe.service';
import Recipe from '../recipe.model';
import { AppState } from '../../store/app.reducers';
import { AuthState } from '../../auth/store/auth.reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private store: Store<AppState>) { }

  recipes: Recipe[];
  showSpinner = true;
  recipeSubscription: Subscription;
  isAuthenticated: Observable<boolean>;
  authSubscription: Subscription;

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    if (this.recipes.length > 0) {
      this.showSpinner = false;
    }

    this.isAuthenticated = this.store.select('auth').pipe(map((authState: AuthState) => {
      return authState.authenticated;
    }));

    this.recipeSubscription = this.recipeService.recipeChangesSub.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.showSpinner = false;
    });

  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}
