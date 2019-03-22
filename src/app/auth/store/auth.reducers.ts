import * as AuthActions from '../store/auth.actions';

export interface AuthState {
    authenticated: boolean;
    token: string;
    email: string;
    passwordError: boolean;
    emailError: boolean;
    errorMessage: string;
}

const initialState: AuthState = {
    authenticated: false,
    token: null,
    email: null,
    passwordError: false,
    emailError: false,
    errorMessage: null
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

        case AuthActions.SET_ERRORS:
          return {
              ...state,
              passwordError: action.payload.passwordError,
              emailError: action.payload.emailError,
              errorMessage: action.payload.errorMessage
          };

        default:
            return state;
    }
}

