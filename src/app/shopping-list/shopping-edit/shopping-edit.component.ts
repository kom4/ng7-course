import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import Ingredient from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  @Output() addNewIngredient = new EventEmitter<Ingredient>();
  @Output() filterIngredients = new EventEmitter<string>();
  @Input() selectedIngredient: Ingredient;
  nameField = false;
  amountField = false;

  constructor() { }

  ngOnInit() {
  }

  addNewIngredientHandler() {
    const name = this.name.nativeElement.value;
    const amount = this.amount.nativeElement.value;
    if (name.length > 0 && amount > 0) {
      this.addNewIngredient.emit(new Ingredient(name, amount));
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

  onInputChangeHandler() {
    this.filterIngredients.emit(this.name.nativeElement.value);
  }

}
