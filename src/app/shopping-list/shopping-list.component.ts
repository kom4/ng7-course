import { Component, OnInit } from '@angular/core';
import Ingredient from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  addedNewIngredient = false;
  selected: number = null;

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Bread', 4),
    new Ingredient('Potato', 2),
    new Ingredient('Carrot', 6)
  ];

  constructor() { }

  ngOnInit() {
  }

  newIngredientToDatabase(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.addedNewIngredient = true;
  }

  highlightSelectedIngredient(index: number) {
    this.selected = index;
  }


}
