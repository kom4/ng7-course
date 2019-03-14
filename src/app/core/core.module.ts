import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { CanDeactivateGuard } from '../guards/can-deactivate-recipe.service';
import { RecipeResolver } from '../guards/recipeResolveGuard.service';
import { AuthService } from '../auth/auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    RecipeResolver,
    CanDeactivateGuard,
    AuthService
  ]
})

export class CoreModule {}
