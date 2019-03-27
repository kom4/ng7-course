import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CanDeactivateGuard } from '../guards/can-deactivate-recipe.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from '../guards/recipeResolveGuard.service';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, data: {depth: 1}, children: [
        { path: 'new', component: RecipeEditComponent, data: {depth: 2}, canDeactivate: [CanDeactivateGuard] },
        { path: ':id', component: RecipeDetailComponent, data: {depth: 3}, resolve: {recipeData: RecipeResolver} },
        { path: ':id/edit', component: RecipeEditComponent, data: {depth: 4}, resolve: {recipeData: RecipeResolver}, canDeactivate: [CanDeactivateGuard] },
      ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule { }
