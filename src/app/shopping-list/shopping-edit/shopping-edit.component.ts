import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('form') form: NgForm;
  selectedIngredient = null;
  selectedSubscription: Subscription;
  ingredient: Ingredient;
  nameIsTaken = false;


  ngOnInit() {
    this.selectedSubscription = this.shoppingListService.selectedIngredient.subscribe((index) => {
      if (index !== null) {
        this.form.reset();
        this.selectedIngredient = index;
        const ingredient = this.shoppingListService.getSingleIngredient(index);
        this.form.setValue({
          'name': ingredient.name,
          'amount': ingredient.amount
        });
      } else {
        this.selectedIngredient = null;
      }
      this.nameIsTaken = false;
    });
  }


  ingredientHandler(form: NgForm) {
    if (this.selectedIngredient === null) {
      this.shoppingListService.
        newIngredientToDatabase(new Ingredient(
          form.value.name,
          form.value.amount
        ));
      form.reset();
    } else {
      this.ingredient = this.shoppingListService.getSingleIngredient(this.selectedIngredient);
      if ((this.ingredient.name.toLowerCase() === form.value.name.toLowerCase()) || (this.shoppingListService.checkIfNameIsTaken(form.value.name) === -1)) {
        this.ingredient = new Ingredient(form.value.name, form.value.amount);
        this.shoppingListService.editIngredient(this.selectedIngredient, this.ingredient);
        this.form.reset();
        this.nameIsTaken = false;
        return;
      } else {
        this.nameIsTaken = true;
      }
    }
  }


  clear(form: NgForm) {
    form.reset();
    this.shoppingListService.selectedIngredient.next(null);
    this.nameIsTaken = false;
  }


  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.selectedIngredient);
    this.form.reset();
    this.nameIsTaken = false;
  }


  ngOnDestroy() {
    this.selectedSubscription.unsubscribe();
  }

}
