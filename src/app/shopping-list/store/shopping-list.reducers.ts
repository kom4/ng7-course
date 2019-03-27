import * as ShoppingListActions from './shopping-list.actions';
import Ingredient from 'src/app/shared/ingredient.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    ingredients: Ingredient[];
    selectedIngredient: Ingredient;
    selectedIngredientIndex: number;
    addedNewIngredient: number;
    updatedOldIngredient: number;
    removedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Tomato', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Meat', 3)
    ],
    selectedIngredient: null,
    selectedIngredientIndex: null,
    addedNewIngredient: null,
    updatedOldIngredient: null,
    removedIngredientIndex: null,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.Actions) {
    let copiedIngredients = [...state.ingredients];

    switch (action.type) {

        case ShoppingListActions.ADD_INGREDIENT:
            let index = copiedIngredients.findIndex((ing) => {
                return ing.name.toLowerCase() === action.payload.name.toLowerCase();
            });
            if (index > -1) {
                copiedIngredients[index].amount += action.payload.amount;
                return {
                    ...state,
                    ingredients: copiedIngredients,
                    addedNewIngredient: null,
                    updatedOldIngredient: index,
                    removedIngredientIndex: null,
                };
            } else {
                copiedIngredients.push(action.payload);
                index = copiedIngredients.length - 1;
                return {
                    ...state,
                    ingredients: copiedIngredients,
                    addedNewIngredient: index,
                    updatedOldIngredient: null,
                    removedIngredientIndex: null,
                };
            }

        case ShoppingListActions.ADD_INGREDIENTS:
            if (copiedIngredients.length === 0) {
                copiedIngredients = action.payload;
            } else {
                copiedIngredients.forEach((oldIng, oldIndex) => {
                    const newIngIndex = action.payload.findIndex((newIng) => {
                        return oldIng.name.toLowerCase() === newIng.name.toLowerCase();
                    });
                    if (newIngIndex >= 0) {
                        copiedIngredients[oldIndex].amount += action.payload[newIngIndex].amount;
                    }
                });
                action.payload.forEach((newIng) => {
                    const oldIngIndex = copiedIngredients.findIndex((oldIng) => {
                        return newIng.name.toLowerCase() === oldIng.name.toLowerCase();
                    });
                    if (oldIngIndex < 0 ) {
                        copiedIngredients.push(newIng);
                    }
                });
            }
            return {
                ...state,
                ingredients: copiedIngredients,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                removedIngredientIndex: null,
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            copiedIngredients[state.selectedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                updatedOldIngredient: state.selectedIngredientIndex,
                removedIngredientIndex: null,
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const removedIngredientIndex = state.selectedIngredientIndex;
            copiedIngredients.splice(state.selectedIngredientIndex, 1);
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                removedIngredientIndex: null,
            };

        case ShoppingListActions.SET_SELECTED_INGREDIENT:
            const selectedIngredient = action.payload !== null ? copiedIngredients[action.payload] : null;
            return {
                ...state,
                selectedIngredient: selectedIngredient,
                selectedIngredientIndex: action.payload,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                removedIngredientIndex: null
            };

        case ShoppingListActions.SET_REMOVED_INGREDIENT:
            return {
                ...state,
                removedIngredientIndex: state.selectedIngredientIndex,
                selectedIngredientIndex: null
            };

        case ShoppingListActions.RESET_INGREDIENT_INDEXES:
            return {
                ...state,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                removedIngredientIndex: null
            };

        default:
            return state;

    }

}

export const getShoppingListState = createFeatureSelector<State>('shoppingList');
export const getIngredients = createSelector(getShoppingListState, (state: State) => state.ingredients);
export const getSelectedIngredient = createSelector(getShoppingListState, (state: State) => state.selectedIngredient);
export const getSelectedIngredientIndex = createSelector(getShoppingListState, (state: State) => state.selectedIngredientIndex);
export const getRemovedIngredientIndex = createSelector(getShoppingListState, (state: State) => state.removedIngredientIndex );
export const getAddedNewIngredient = createSelector(getShoppingListState, (state: State) => state.addedNewIngredient);
export const getUpdatedOldIngredient = createSelector(getShoppingListState, (state: State) => state.updatedOldIngredient);

