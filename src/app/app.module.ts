import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipeResolver } from './guards/recipeResolveGuard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-recipe.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      ShoppingListComponent,
      ShoppingEditComponent,
      SignupComponent,
      SigninComponent,
   ],
   imports: [
      BrowserModule,
      RecipesModule,
      AppRoutingModule,
      FormsModule,
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
