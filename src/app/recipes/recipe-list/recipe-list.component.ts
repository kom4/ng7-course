import { Component, OnInit } from '@angular/core';
import Recipe from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a testing recipe',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Ca7GSo1yTImrgiV0nohjJq9URaeIDeuIHc6H7n2dzcLGx4_N'),
      new Recipe(
        'A test recipe 2',
        'Second recipe',
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--488691_11.jpg?itok=ExaTspz1')
  ];

  constructor() { }

  ngOnInit() {
  }

}
