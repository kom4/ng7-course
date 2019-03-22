import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  showSpinner = false;
  email = '';
  password = '';
  emailError: boolean;
  passwordError: boolean;
  errorMessage = '';
  authSub: Subscription;

  ngOnInit() {
    this.authSub = this.store.select('auth')
      .subscribe((authState) => {
        this.emailError = authState.emailError;
        this.passwordError = authState.passwordError;
        this.errorMessage = authState.errorMessage;
      });
  }

  onSignIn(form: NgForm) {
    // this.showSpinner = true;
    // this.emailError = false;
    // this.passwordError = false;
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TryLogin({email: email, password: password}));

  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
