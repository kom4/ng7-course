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
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      RecipesModule,
      ShoppingListModule,
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
