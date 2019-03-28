import Ingredient from 'src/app/shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const RESET_INGREDIENT_INDEXES = 'RESET_INGREDIENT_INDEXES';
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class SetSelectedIngredient implements Action {
  readonly type = SET_SELECTED_INGREDIENT;
  constructor(public payload: number) {}
}

export class ResetIngredientIndexes implements Action {
  readonly type = RESET_INGREDIENT_INDEXES;
}

export type Actions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | SetSelectedIngredient
  | ResetIngredientIndexes;
