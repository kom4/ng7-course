import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRouting } from './auth-routing.module';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
    ],
    imports: [
        AuthRouting,
        SharedModule
    ]
})

export class AuthModule { }
