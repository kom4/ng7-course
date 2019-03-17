import { Action } from '@ngrx/store';
import Ingredient from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SET_EDITED_INGREDIENT = 'SET_EDITED_INGREDIENT';
export const HIGHLIGHT_NEW_INGREDIENT = 'HIGHLIGHT_NEW_INGREDIENT';

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

export class SetEditedIngredient implements Action {
    readonly type = SET_EDITED_INGREDIENT;
    constructor(public payload: number) {}
}

export class HighlightNewIngredient implements Action {
    readonly type = HIGHLIGHT_NEW_INGREDIENT;
    constructor(public payload: boolean) {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | SetEditedIngredient
  | HighlightNewIngredient;
