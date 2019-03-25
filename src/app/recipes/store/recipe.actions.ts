import { Action } from '@ngrx/store';
import Recipe from '../recipe.model';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const IMPORT_RECIPES = 'IMPORT_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const GET_RECIPE = 'GET_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const SAVE_RECIPES_TO_SERVER = 'SAVE_RECIPES_TO_SERVER';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class ImportRecipes implements Action {
  readonly type = IMPORT_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {recipe: Recipe, index: number}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: number) {}
}

export class ShowSpinner implements Action {
  readonly type = SHOW_SPINNER;
}

export class SaveRecipesToServer implements Action {
  readonly type = SAVE_RECIPES_TO_SERVER;
}

export type Actions =
  | AddRecipe
  | FetchRecipes
  | ImportRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | ShowSpinner
  | SaveRecipesToServer;
