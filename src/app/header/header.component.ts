import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: '<app-header>',
    templateUrl: '/header.component.html',
    // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  section = '';
  @Output() sectionEmitter = new EventEmitter<string>();

  sectionShowHandler(section: string) {
    this.section = section;
    this.sectionEmitter.emit(this.section);
  }

    constructor(
      private recipeService: RecipeService,
      private authService: AuthService) {}

    ngOnInit() {}

    onSaveData() {
      this.recipeService.saveRecipesToDatabase()
        .subscribe();
    }

    onFetchData() {
      this.recipeService.fetchRecipesFromDatabase();
    }

}
