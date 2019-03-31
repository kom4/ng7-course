import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { State as AuthState } from './auth/store/auth.reducers';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Recipe book';

  constructor(private store: Store<AuthState>,
      private ngZone: NgZone) {}

  showSpinner = true;
  authUnsubscribe: firebase.Unsubscribe;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      firebase.initializeApp({
        apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
        authDomain: 'recipeapp-4444.firebaseapp.com'
      });
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
