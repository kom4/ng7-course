import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ShoppingListModule,
    SharedModule,
    StoreModule.forRoot({ shoppingList: shoppingListReducer })
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
