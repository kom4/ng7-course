import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Recipe from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeToDetails: Recipe;

  constructor() { }

  ngOnInit() { }

  sendRecipeToDetails(recipe: Recipe) {
    this.recipeToDetails = recipe;
  }

}
