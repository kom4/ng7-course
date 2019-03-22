import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  @Effect() authRegister = this.actions$
    .pipe(ofType(AuthActions.TRY_REGISTER))
    .pipe(
      map((action: AuthActions.TryRegister) => {
        return action.payload;
      })
    )
    .pipe(
      switchMap((authData: { email: string; password: string }) => {
        return from(
          firebase
            .auth()
            .createUserWithEmailAndPassword(authData.email, authData.password)
        );
      })
    )
    .pipe(
      switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken());
      })
    )
    .pipe(
      map((token: string) => {
        return {
          type: AuthActions.REGISTER_USER,
          payload: {
            email: firebase.auth().currentUser.email,
            token: token
          }
        };
      })
    );

  @Effect() authLogin = this.actions$
    .pipe(ofType(AuthActions.TRY_LOGIN))
    .pipe(
      map((action: AuthActions.TryLogin) => {
        return action.payload;
      })
    )
    .pipe(
      switchMap((authData: { email: string; password: string }) => {
        return from(
          firebase
            .auth()
            .signInWithEmailAndPassword(authData.email, authData.password)
        );
      })
    )
    .pipe(
      map(data => {
        const token = firebase.auth().currentUser.getIdToken();
        const email = firebase.auth().currentUser.email;
        return {
          type: AuthActions.LOGIN_USER,
          payload: {
            email: firebase.auth().currentUser.email,
            token: token
          }
        };
      }),
      catchError(error => {
        let passwordError = false;
        let emailError = false;
        let errorMessage: string;
        switch (error.code) {
          case 'auth/wrong-password':
            passwordError = true;
            errorMessage = error.message;
            break;
          case 'auth/user-not-found':
            emailError = true;
            errorMessage = error.message;
            break;
          default:
            break;
        }
        return of ({
          type: AuthActions.SET_ERRORS,
          payload: {
            passwordError: passwordError,
            emailError: emailError,
            errorMessage: errorMessage
          }
        });
      }));

}
