import * as RecipeActions from './recipe.actions';
import Recipe from '../recipe.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import Ingredient from 'src/app/shared/ingredient.model';

export interface RecipeState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
    initialFetchingDone: boolean;
    showSpinner: boolean;
}

const initialState: State = {
    recipes: [],
    initialFetchingDone: false,
    showSpinner: false
};



export function recipeReducers (state = initialState, action: RecipeActions.Actions) {
    const copiedRecipes = [...state.recipes];

    switch (action.type) {
        case RecipeActions.IMPORT_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                initialFetchingDone: true,
                showSpinner: false
            };

        case RecipeActions.ADD_RECIPE:
            copiedRecipes.push(action.payload);
            return {
                ...state,
                recipes: copiedRecipes
            };

        case RecipeActions.UPDATE_RECIPE:
            copiedRecipes[action.payload.index] = action.payload.recipe;
            return {
                ...state,
                recipes: copiedRecipes
            };

        case RecipeActions.DELETE_RECIPE:
            copiedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: copiedRecipes
            };

        case RecipeActions.SHOW_SPINNER:
            return {
                ...state,
                showSpinner: true
            };


        default:
            return state;
    }

}


const getFeature = createFeatureSelector<State>('recipes');
export const getRecipes = createSelector(getFeature, (state: State) => {
    return state.recipes;
});
