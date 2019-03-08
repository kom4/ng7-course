import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) {}

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

    this.authService.signinUser(email, password).catch(error => {
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
