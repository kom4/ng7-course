import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeService } from '../../recipes/recipe.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromRecipe from '../../recipes/store/recipe.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import { LogoutUser } from 'src/app/auth/store/auth.actions';
import { Router } from '@angular/router';

@Component({
    selector: '<app-header>',
    templateUrl: './header.component.html',
    // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

    constructor(
      private recipeService: RecipeService,
      private router: Router,
      private appStore: Store<fromApp.AppState>,
      private recipeStore: Store<fromRecipe.RecipeState>) {}

    ngOnInit() {
      this.authState = this.appStore.select('auth');
    }

    onLogoutUser() {
      this.appStore.dispatch(new LogoutUser());
    }

    onSaveData() {
      this.appStore.dispatch(new RecipeActions.SaveRecipesToServer());
    }

    onFetchData() {
      this.router.navigate(['/recipes']);
      this.recipeStore.dispatch(new RecipeActions.FetchRecipes());
    }

}
