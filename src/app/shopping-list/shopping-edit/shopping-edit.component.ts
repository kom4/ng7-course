import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  form: FormGroup;
  selectedIngredient = null;

  ngOnInit() {
    this.shoppingListService.selectedIngredient.subscribe((index) => {
      if (index !== null) {
        this.selectedIngredient = index;
      } else {
        this.selectedIngredient = null;
      }
    });

    this.form = new FormGroup({
      'ingredientName': new FormControl(null, Validators.required),
      'ingredientAmount': new FormControl(null, Validators.required)
    });
  }

  addNewIngredientHandler() {
    this.shoppingListService.
      newIngredientToDatabase(new Ingredient(
        this.form.get('ingredientName').value,
        this.form.get('ingredientAmount').value
      ));
    this.form.reset();
  }

  clear() {
    this.form.reset();
    this.shoppingListService.selectedIngredient.next(null);
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
  }

}
