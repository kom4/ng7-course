import { Component, OnInit, OnDestroy } from '@angular/core';
import Ingredient from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) {}

  selected: number = null;
  ingredients: Ingredient[] = [];
  addedNewIngredient = null;
  addedIngredient: Subscription;
  ingredientsChanged: Subscription;
  selectedIngredient: Subscription;

  ngOnInit() {

    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsChanged = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
      this.addedNewIngredient = this.ingredients.length - 1;
    });

    this.addedIngredient = this.shoppingListService.addNewIngredient.subscribe((value: number) => {
      this.addedNewIngredient = value;
    });

    this.selectedIngredient = this.shoppingListService.selectedIngredient.subscribe((index: number) => {
      this.selected = index;
    });

  }

  setSelected(index: number) {
    this.shoppingListService.selectedIngredient.next(index);
  }

  ngOnDestroy() {
    this.addedIngredient.unsubscribe();
    this.ingredientsChanged.unsubscribe();
    this.selectedIngredient.unsubscribe();
  }


}
