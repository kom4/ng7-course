import * as ShoppingListActions from './shopping-list.actions';
import Ingredient from 'src/app/shared/ingredient.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
    ingredients: Ingredient[];
    selectedIngredient: Ingredient;
    selectedIngredientIndex: number;
    addedNewIngredient: number;
    updatedOldIngredient: number;
    deletedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Tomato', 2),
        new Ingredient('Onion', 1),
        new Ingredient('Meat', 3),
        new Ingredient('Potato', 4),
        new Ingredient('Salad', 1)
    ],
    selectedIngredient: null,
    selectedIngredientIndex: null,
    addedNewIngredient: null,
    updatedOldIngredient: null,
    deletedIngredientIndex: null
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
                    deletedIngredientIndex: null
                };
            } else {
                copiedIngredients.push(action.payload);
                index = copiedIngredients.length - 1;
                return {
                    ...state,
                    ingredients: copiedIngredients,
                    addedNewIngredient: index,
                    updatedOldIngredient: null,
                    deletedIngredientIndex: null
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
                selectedIngredientIndex: null,
                deletedIngredientIndex: null
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            copiedIngredients[state.selectedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                updatedOldIngredient: state.selectedIngredientIndex,
                deletedIngredientIndex: null
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            copiedIngredients.splice(state.selectedIngredientIndex, 1);
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                deletedIngredientIndex: null
            };

        case ShoppingListActions.SET_SELECTED_INGREDIENT:
            const selectedIngredient = action.payload !== null ? copiedIngredients[action.payload] : null;
            return {
                ...state,
                selectedIngredient: selectedIngredient,
                selectedIngredientIndex: action.payload,
                addedNewIngredient: null,
                updatedOldIngredient: null,
                deletedIngredientIndex: null
            };

        case ShoppingListActions.RESET_INGREDIENT_INDEXES:
            return {
                ...state,
                addedNewIngredient: null,
                selectedIngredientIndex: null,
                updatedOldIngredient: null,
                deletedIngredientIndex: null
            };

        case ShoppingListActions.SET_DELETED_INGREDIENT_INDEX:
            return {
                ...state,
                deletedIngredientIndex: state.selectedIngredientIndex
            };

        default:
            return state;

    }

}

export const getShoppingListState = createFeatureSelector<State>('shoppingList');
export const getIngredients = createSelector(getShoppingListState, (state: State) => state.ingredients);
export const getSelectedIngredient = createSelector(getShoppingListState, (state: State) => state.selectedIngredient);
export const getSelectedIngredientIndex = createSelector(getShoppingListState, (state: State) => state.selectedIngredientIndex);
export const getAddedNewIngredient = createSelector(getShoppingListState, (state: State) => state.addedNewIngredient);
export const getUpdatedOldIngredient = createSelector(getShoppingListState, (state: State) => state.updatedOldIngredient);
export const getDeletedIngredientIndex = createSelector(getShoppingListState, (state: State) => state.deletedIngredientIndex);

