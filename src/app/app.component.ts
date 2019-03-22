import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { AuthState } from './auth/store/auth.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Recipe book';

  constructor(private store: Store<AuthState>) {}

  showSpinner = true;
  authUnsubscribe: firebase.Unsubscribe;

  async ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
      authDomain: 'recipeapp-4444.firebaseapp.com'
    });
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.showSpinner = false;
      if (user) {
        user.getIdToken().then(token => {
          const email = firebase.auth().currentUser.email;
          this.store.dispatch(new AuthActions.LoginUser({ email, token }));
        });
      }
    });
  }

  ngOnDestroy() {
    this.authUnsubscribe();
  }

}
