import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}

  @ViewChild('f') form: NgForm;
  showSpinner = false;
  email = '';
  password = '';
  emailError: boolean;
  passwordError: boolean;
  errorMessage = '';
  authSub: Subscription;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(authState => {
      this.emailError = authState.emailError;
      this.passwordError = authState.passwordError;
      this.errorMessage = authState.errorMessage;
      this.showSpinner = authState.authenticated;
      this.password = '';
    });
  }

  onSignIn(form: NgForm) {
    this.showSpinner = true;
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new AuthActions.TryLogin({ email: email, password: password })
    );
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.store.dispatch(new AuthActions.ResetErrors());
  }
}
