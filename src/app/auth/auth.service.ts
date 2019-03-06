import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    let i = 2;
    console.log(i++);
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
    let i = 0;
    console.log(i++);
    
    return firebase.auth().currentUser.email;
  }

  isAuthenticated() {
    let i = 1;
    console.log(i++);
    return this.token != null;
  }

  checkLocalStorageForTokens() {
    // const request = window.indexedDB.open('firebaseLocalStorageDb');
    // request.onsuccess = () => {
    //  const db = request.result;
    //  const transaction = db.transaction(['firebaseLocalStorage']);
    //  const objectStore = transaction.objectStore('firebaseLocalStorage');
    //  const request2 = objectStore.getAll();
    //  request2.onsuccess = (event) => {
    //    this.token = request2.result.pop().value;
    //    console.log(this.token);
    //  };
    // };
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/recipes']);
  }

}
