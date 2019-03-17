import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRouting } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
      SignupComponent,
      SigninComponent
    ],
    imports: [
      SharedModule,
      AuthRouting
    ]
})

export class AuthModule { }
