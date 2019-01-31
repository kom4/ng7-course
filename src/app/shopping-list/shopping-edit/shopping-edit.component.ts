import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  selectedIngredient = null;
  selectedSubscription: Subscription;

  ngOnInit() {
    this.selectedSubscription = this.shoppingListService.selectedIngredient.subscribe((index) => {
      if (index !== null) {
        this.selectedIngredient = index;
      } else {
        this.selectedIngredient = null;
      }
    });
  }

  addNewIngredientHandler(form: NgForm) {
    this.shoppingListService.
      newIngredientToDatabase(new Ingredient(
        form.value.name,
        form.value.amount
      ));
    form.reset();
  }

  clear(form: NgForm) {
    form.reset();
    this.shoppingListService.selectedIngredient.next(null);
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
  }

  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }

}
