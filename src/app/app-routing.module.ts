import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './guards/recipeResolveGuard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-recipe.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
    { path: ':id', component: RecipeDetailComponent, resolve: {recipeData: RecipeResolver} },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard], resolve: {recipeData: RecipeResolver}, canDeactivate: [CanDeactivateGuard] },
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
