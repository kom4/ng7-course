import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRouting } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      SignupComponent,
      SigninComponent,
    ],
    imports: [
      CommonModule,
      AuthRouting,
      FormsModule
    ]
})

export class AuthModule { }
