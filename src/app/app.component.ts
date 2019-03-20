import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { AuthState } from './auth/store/auth.reducers';
import * as AuthActions from './auth/store/aut.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Recipe book';

  constructor(private store: Store<AuthState>) {}

  showSpinner = true;

 async ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
      authDomain: 'recipeapp-4444.firebaseapp.com'
    });

    const promise = new Promise((resolve, rejcet) => {
      firebase.auth().onAuthStateChanged((user) => {
        this.showSpinner = false;
        if (user) {
          user.getIdToken().then(
            (token) => {
              const email = firebase.auth().currentUser.email;
              this.store.dispatch(new AuthActions.LoginUser({email, token}));
              resolve(true);
            }
          );
        }
      });

    });
    await promise.then((msg) => {
      console.log('done');
      
    });
  }
}
