import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { AuthState } from './auth/store/auth.reducers';
import * as AuthActions from './auth/store/aut.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Recipe book';
  unsubscribe: firebase.Unsubscribe;

  constructor(private store: Store<AuthState>) {}

  showSpinner = true;

 async ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
      authDomain: 'recipeapp-4444.firebaseapp.com'
    });
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.showSpinner = false;
      if (user) {
        user.getIdToken().then(
          (token) => {
            const email = firebase.auth().currentUser.email;
            this.store.dispatch(new AuthActions.LoginUser({email, token}));
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
