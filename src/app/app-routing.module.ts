import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'signup', canActivate: [AuthGuard], component: SignupComponent },
  { path: 'signin', canActivate: [AuthGuard], component: SigninComponent },
  { path: '**', redirectTo: 'recipes' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
