import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng7-project';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBn8Gnz4CzWddwHBt0E03BxLzRcfd8aUK8',
      authDomain: 'recipeapp-4444.firebaseapp.com'
    });
  }
}
