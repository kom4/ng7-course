import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(map((authState: fromAuth.AuthState) => {
      console.log(authState.authenticated);
      console.log(authState.email);
      
          
      // if (authState.authenticated) {
      //   console.log('Cant pass', authState.authenticated);
      //   this.router.navigate(['']);
      // }
      return !authState.authenticated;
    }));
  }

}
