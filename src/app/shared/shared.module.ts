import { NgModule } from '@angular/core';
import { DropdownDirective } from '../Directives/dropdown.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    DropdownDirective,
    SpinnerComponent
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    FormsModule,
    SpinnerComponent
  ]
})

export class SharedModule { }
