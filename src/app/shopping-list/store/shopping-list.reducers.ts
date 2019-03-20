import * as ShoppingListActions from './shopping-list.actions';
import Ingredient from 'src/app/shared/ingredient.model';

export interface State {
    ingredients: Ingredient[];
    selectedIngredient: Ingredient;
    selectedIngredientIndex: number;
    addedNewIngredient: number;
}

const initialState: State = {
    ingredients: [],
    selectedIngredient: null,
    selectedIngredientIndex: null,
    addedNewIngredient: null
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
            } else {
                copiedIngredients.push(action.payload);
                index = copiedIngredients.length - 1;
            }
            return {
                ...state,
                ingredients: copiedIngredients,
                addedNewIngredient: index
            };

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
                ingredients: copiedIngredients
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            copiedIngredients[state.selectedIngredientIndex] = action.payload;
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                addedNewIngredient: state.selectedIngredientIndex,
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            copiedIngredients.splice(state.selectedIngredientIndex, 1);
            return {
                ...state,
                ingredients: copiedIngredients,
                selectedIngredient: null,
                selectedIngredientIndex: null,
                addedNewIngredient: null,
            };

        case ShoppingListActions.SET_SELECTED_INGREDIENT:
            const selectedIngredient = action.payload !== null ? copiedIngredients[action.payload] : null;
            return {
                ...state,
                selectedIngredient: selectedIngredient,
                selectedIngredientIndex: action.payload,
                addedNewIngredient: null
            };

        default:
            return state;

    }

}
