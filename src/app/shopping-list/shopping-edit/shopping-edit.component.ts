import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  // @Input() selectedIngredient: Ingredient;
  nameField = false;
  amountField = false;

  ngOnInit() {
  }

  addNewIngredientHandler() {
    const name = this.name.nativeElement.value;
    const amount = this.amount.nativeElement.value;
    if (name.length > 0 && amount > 0) {
      this.shoppingListService.newIngredientToDatabase(new Ingredient(name, amount));
      this.resetValues();
    } else {
      this.nameField = name ? false : true;
      this.amountField = amount ? false : true;
    }
  }

  resetValues() {
    this.name.nativeElement.value = '';
    this.amount.nativeElement.value = '';
    this.nameField = false;
    this.amountField = false;
  }

}
