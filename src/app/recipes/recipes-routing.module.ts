import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CanDeactivateGuard } from '../guards/can-deactivate-recipe.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from '../guards/recipeResolveGuard.service';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, data: {depth: 'home'}, children: [
        { path: 'new', component: RecipeEditComponent, data: {depth: 'new'}, canDeactivate: [CanDeactivateGuard] },
        { path: ':id', component: RecipeDetailComponent, data: {depth: 'show'}, resolve: {recipeData: RecipeResolver} },
        { path: ':id/edit', component: RecipeEditComponent, data: {depth: 'edit'}, resolve: {recipeData: RecipeResolver}, canDeactivate: [CanDeactivateGuard] },
      ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule { }
