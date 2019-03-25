import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect() authRegister$ = this.actions$.pipe(
    ofType(AuthActions.TRY_REGISTER),
    map((action: AuthActions.TryRegister) => {
      return action.payload;
    }),
    switchMap((authData: { email: string; password: string }) => {
      return from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.email, authData.password)
      );
    }),
    switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }),
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

  @Effect() authLogin$ = this.actions$.pipe(
    ofType(AuthActions.TRY_LOGIN),
    map((action: AuthActions.TryLogin) => {
      return action.payload;
    }),
    switchMap((authData: { email: string; password: string }) => {
      return from(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.email, authData.password)
      ).pipe(
        map(() => {
          const token = firebase.auth().currentUser.getIdToken();
          const email = firebase.auth().currentUser.email;
          return {
            type: AuthActions.LOGIN_USER,
            payload: {
              email: email,
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
          return of(
            new AuthActions.SetErrors({
              passwordError: passwordError,
              emailError: emailError,
              errorMessage: errorMessage
            })
          );
        })
      );
    })
  );

  @Effect({ dispatch: false }) onLogout$ = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_USER),
    tap(() => {
      firebase.auth().signOut();
      this.router.navigate(['/']);
    })
  );
}
