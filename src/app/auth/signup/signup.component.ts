import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  showSpinner = false;

  ngOnInit() {
  }

  onSignUp (form: NgForm) {
    this.showSpinner = true;
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.TryRegister({email: email, password: password}));
  }

}
