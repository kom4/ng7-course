import * as ShoppingListActions from './shopping-list.actions';
import Ingredient from '../../shared/ingredient.model';

export interface AppState {
    shoppingList: State;
}

interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
    addedNewIngredient: boolean;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Onion', 2),
        new Ingredient('Meat', 3),
        new Ingredient('Tomato', 12),
        new Ingredient('Potato', 6),
    ],
    editedIngredient: null,
    editedIngredientIndex: null,
    addedNewIngredient: false
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {

    let updatedIngredients = [...state.ingredients];

    switch (action.type) {

        case ShoppingListActions.ADD_INGREDIENT:
            const index = updatedIngredients.findIndex((ing: Ingredient) => {
                return ing.name.toLowerCase() === action.payload.name.toLowerCase();
            });
            let isItNewIngredient: boolean;
            if (index > -1) {
                updatedIngredients[index].amount += action.payload.amount;
                isItNewIngredient = false;
            } else {
                updatedIngredients.push(action.payload);
                isItNewIngredient = true;
            }
            return {
                ...state,
                ingredients: updatedIngredients,
                addedNewIngredient: isItNewIngredient
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            if (updatedIngredients.length === 0) {
                updatedIngredients = action.payload;
            } else {
                updatedIngredients.forEach((oldIng, oldIndex) => {
                    const newIngIndex = action.payload.findIndex((newIng) => {
                        return oldIng.name.toLowerCase() === newIng.name.toLowerCase();
                    });
                    if (newIngIndex >= 0) {
                        updatedIngredients[oldIndex].amount += action.payload[newIngIndex].amount;
                    }
                });
                action.payload.forEach((newIng) => {
                    const oldIngIndex = updatedIngredients.findIndex((oldIng) => {
                        return newIng.name.toLowerCase() === oldIng.name.toLowerCase();
                    });
                    if (oldIngIndex < 0 ) {
                        updatedIngredients.push(newIng);
                    }
                });
            }
            return {
                ...state,
                ingredients: updatedIngredients
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            updatedIngredients[state.editedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: updatedIngredients
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            updatedIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: updatedIngredients
            };

        case ShoppingListActions.SET_EDITED_INGREDIENT:
            const selectedIngredient = action.payload !== null ? updatedIngredients[action.payload] : null;
            return {
                ...state,
                editedIngredient: selectedIngredient,
                editedIngredientIndex: action.payload
            };

        case ShoppingListActions.HIGHLIGHT_NEW_INGREDIENT:
            return {
                ...state,
                addedNewIngredient: action.payload
            };

        default:
            return state;
    }

}
