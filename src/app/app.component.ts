import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ng7-project';

  constructor(private authService: AuthService) {}

  showSpinner = true;

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
      authDomain: 'recipeapp-4444.firebaseapp.com'
    });

    firebase.auth().onAuthStateChanged((user) => {
      this.showSpinner = false;
      if (user) {
        user.getIdToken().then(
          (token) => {
            this.authService.token = token;
            this.authService.authenticationChange.next();
          }
        );
      }
    });
  }
}
