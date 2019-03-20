import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/aut.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  showSpinner = false;
  email = '';
  password = '';
  emailError = false;
  passwordError = false;
  errorMessage = '';

  ngOnInit() {}

  onSignIn(form: NgForm) {
    this.showSpinner = true;
    this.emailError = false;
    this.passwordError = false;
    const email = form.value.email;
    const password = form.value.password;
    let token = '';

     this.authService.signinUser(email, password).then(() => {
      firebase.auth().currentUser.getIdToken().then(currentToken => {
        token = currentToken;
        this.store.dispatch(new AuthActions.LoginUser({email, token }));
      });

    }).catch(error => {
      this.showSpinner = false;
      switch (error.code) {
        case 'auth/wrong-password':
          this.passwordError = true;
          this.errorMessage = error.message;
          this.password = '';
          break;
        case 'auth/user-not-found':
          this.emailError = true;
          this.errorMessage = error.message;
          this.password = '';
          break;
        default:
          break;
      }
    });
  }

}
