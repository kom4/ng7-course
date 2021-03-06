import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';

import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate, OnDestroy {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  authUnsubscribe: firebase.Unsubscribe;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise(resolve => {
      this.authUnsubscribe = firebase
        .auth()
        .onAuthStateChanged((user: firebase.User) => {
          if (!user) {
            resolve(true);
          } else {
            this.router.navigate(['/recipes']);
            resolve(false);
          }
        });
    });
  }

  ngOnDestroy() {
    this.authUnsubscribe();
  }
}
