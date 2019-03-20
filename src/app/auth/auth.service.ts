import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as firebase from 'firebase';
import * as fromAuth from '../auth/store/auth.reducers';
import * as AuthActions from './store/aut.actions';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private store: Store<fromAuth.AuthState>) {}

  async signinUser(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.store.dispatch(new AuthActions.LoginUser({email, token}));
              }
            );
        }
      );
  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then (
        response => {
        this.router.navigate(['/recipes']);
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.store.dispatch(new AuthActions.RegisterUser({email, token}));
            }
          );
        }
      ).catch(
        error => console.log(error)
      );
  }

  getCurrentUserEmail(): string {
    return firebase.auth().currentUser.email;
  }

  logoutUser() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogoutUser());
  }

}
