import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingListEffects } from './store/shopping-list.effects';
// import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
      // RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
      EffectsModule.forFeature([ShoppingListEffects]),
      CommonModule,
      FormsModule
    ]
})

export class ShoppingListModule { }
