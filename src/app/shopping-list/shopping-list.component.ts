import { Component, OnInit, DoCheck } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, DoCheck {

  constructor(private shoppingListService: ShoppingListService) {}

  selected: number = null;
  ingredients: Ingredient[] = [];
  addedNewIngredient = false;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
    this.shoppingListService.addNewIngredient.subscribe(() => {
      this.addedNewIngredient = true;
    });
  }

  ngDoCheck() {
    this.selected = this.shoppingListService.selectedIngredient;
  }


  setSelected(index: number) {
    this.shoppingListService.selectedIngredient = index;
  }


}
