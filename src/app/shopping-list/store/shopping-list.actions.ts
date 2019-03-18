import Ingredient from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SET_SELECTED_INGREDIENT = 'SET_SELECTED_INGREDIENT';

export class AddIngredient {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient {
  readonly type = DELETE_INGREDIENT;
}

export class SetSelectedIngredient {
  readonly type = SET_SELECTED_INGREDIENT;
  constructor(public payload: number) {}
}

export type Actions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | SetSelectedIngredient;
