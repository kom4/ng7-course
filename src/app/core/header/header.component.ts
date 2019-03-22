import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeService } from '../../recipes/recipe.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: '<app-header>',
    templateUrl: './header.component.html',
    // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.AuthState>;

    constructor(
      private recipeService: RecipeService,
      private authService: AuthService,
      private store: Store<fromApp.AppState>) {}

    ngOnInit() {
      this.authState = this.store.select('auth');
    }

    onLogoutUser() {
      this.authService.logoutUser();
    }

    onSaveData() {
      this.recipeService.saveRecipesToDatabase()
        .subscribe();
    }

    onFetchData() {
      this.recipeService.fetchRecipesFromDatabase();
    }

}
