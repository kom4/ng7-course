import { Action } from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN_USER = 'LOGIN_USER';
export const TRY_REGISTER = 'TRY_REGISTER';
export const REGISTER_USER = 'REGISTER_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_ERRORS = 'SET_ERROR';
export const RESET_ERRORS = 'RESET_ERRORS';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginUser implements Action {
  readonly type = LOGIN_USER;
  constructor(public payload: { email: string; token: string }) {}
}

export class TryRegister implements Action {
  readonly type = TRY_REGISTER;
  constructor(public payload: { email: string; password: string }) {}
}

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: { email: string; token: string }) {}
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export class SetErrors implements Action {
  readonly type = SET_ERRORS;
  constructor(
    public payload: {
      passwordError: boolean;
      emailError: boolean;
      errorMessage: string;
    }
  ) {}
}

export class ResetErrors implements Action {
  readonly type = RESET_ERRORS;
}

export type Actions =
  | TryLogin
  | LoginUser
  | TryRegister
  | RegisterUser
  | LogoutUser
  | SetErrors
  | ResetErrors;
