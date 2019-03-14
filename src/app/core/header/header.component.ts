import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: '<app-header>',
    templateUrl: './header.component.html',
    // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  section = '';
  isAuthenticated: boolean;
  authSubscription: Subscription;
  currentUserEmail = 'dd';

    constructor(
      private recipeService: RecipeService,
      private authService: AuthService) {}

    ngOnInit() {
      this.isAuthenticated = this.authService.isAuthenticated();
      if (this.isAuthenticated) {
        this.currentUserEmail = this.authService.getCurrentUserEmail();
      }
      this.authSubscription = this.authService.authenticationChange.subscribe(
        () => {
          this.isAuthenticated = this.authService.isAuthenticated();
          this.currentUserEmail = this.authService.getCurrentUserEmail();
        }
      );

    }

    onSaveData() {
      this.recipeService.saveRecipesToDatabase()
        .subscribe();
    }

    onFetchData() {
      this.recipeService.fetchRecipesFromDatabase();
    }

    ngOnDestroy() {
      this.authSubscription.unsubscribe();
    }

}
