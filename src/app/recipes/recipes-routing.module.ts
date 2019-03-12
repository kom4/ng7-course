import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { CanDeactivateGuard } from '../guards/can-deactivate-recipe.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from '../guards/recipeResolveGuard.service';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, children: [
        { path: 'new', component: RecipeEditComponent, canDeactivate: [CanDeactivateGuard] },
        { path: ':id', component: RecipeDetailComponent, resolve: {recipeData: RecipeResolver} },
        { path: ':id/edit', component: RecipeEditComponent, resolve: {recipeData: RecipeResolver}, canDeactivate: [CanDeactivateGuard] },
      ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule { }
