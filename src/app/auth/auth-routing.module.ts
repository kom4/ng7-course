import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
    { path: 'signup', canActivate: [AuthGuard], component: SignupComponent },
    { path: 'signin', canActivate: [AuthGuard], component: SigninComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRouting { }
