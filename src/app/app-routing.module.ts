import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolver } from './guards/recipeResolveGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: {recipe: RecipeResolver} },
    { path: ':id/edit', component: RecipeEditComponent, resolve: {recipe: RecipeResolver} },
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '**', redirectTo: 'recipes' }

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
