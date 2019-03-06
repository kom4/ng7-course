import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then (
        response => this.router.navigate(['/signin'])
      ).catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/recipes']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      ).catch(
        error => console.log(error)
      );
  }

  getToken() {
    if (firebase.auth().currentUser === null) {
      return null;
    }
    firebase.auth().currentUser.getIdToken()
    .then(
        (token: string) => this.token = token
      );
      return this.token;
  }

  getCurrentUserEmail(): string {
    return firebase.auth().currentUser.email;
  }

  isAuthenticated() {
    return this.token != null;
  }

  checkLocalStorageForTokens() {
    // firebase.storage().app.stora
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/recipes']);
  }

}
