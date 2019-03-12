import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipeResolver } from './guards/recipeResolveGuard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-recipe.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      AuthModule,
      AppRoutingModule,
      HttpModule,
      SharedModule
   ],
   providers: [
      ShoppingListService,
      RecipeService,
      RecipeResolver,
      CanDeactivateGuard,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
