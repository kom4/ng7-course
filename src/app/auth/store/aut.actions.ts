import { Action } from '@ngrx/store';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const SET_TOKEN = 'SET_TOKEN';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: {email: string, token: string}) {}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class RegisterUser implements Action {
    readonly type = REGISTER_USER;
    constructor(public payload: {email: string, token: string}) {}
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) {}
}

export type Actions =
LoginUser |
LogoutUser |
RegisterUser;
