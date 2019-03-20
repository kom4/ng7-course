import * as AuthActions from '../store/aut.actions';

export interface AuthState {
    authenticated: boolean;
    token: string;
    email: string;
}

const initialState: AuthState = {
    authenticated: false,
    token: null,
    email: null
};

export function authReducers(state = initialState, action: AuthActions.Actions) {
    switch (action.type) {

        case AuthActions.LOGIN_USER:
        case AuthActions.REGISTER_USER:
            return {
                ...state,
                authenticated: true,
                token: action.payload.token,
                email: action.payload.email
            };

        case AuthActions.LOGOUT_USER:
            return {
                ...state,
                authenticated: false,
                token: null,
                email: null
            };

        default:
            return state;
    }
}

