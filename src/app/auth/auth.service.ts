import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  token: string;
  authenticationChange = new Subject<any>();

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then (
        response => this.router.navigate(['/signin'])
      ).catch(
        error => console.log(error)
      );
  }

  async signinUser(email: string, password: string) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
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
    this.authenticationChange.next();
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

  isAuthenticated(): boolean {
    return this.token != null;
  }

  // checkLocalStorageForTokens() {
  //   const request = window.indexedDB.open('firebaseLocalStorageDb');
  //   request.onsuccess = () => {
  //    const db = request.result;
  //    const transaction = db.transaction(['firebaseLocalStorage']);
  //    const objectStore = transaction.objectStore('firebaseLocalStorage');
  //    const request2 = objectStore.getAll();
  //    request2.onsuccess = (event) => {
  //      if (request2.result.length > 0) {
  //        this.token = request2.result.pop().value;
  //       //  this.authenticationChange.next();
  //       firebase.auth().currentUser.getIdToken().then((token) => { console.log(token );
  //       });
  //      }
  //      console.log(this.token);
  //    };
  //   };
  // }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/recipes']);
    this.authenticationChange.next();
  }

}
