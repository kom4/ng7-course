import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';
import { State } from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(take(1), switchMap((authState: State) => {
      if (authState.token !== null) {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token) });
        return next.handle(copiedReq);
      }
      return next.handle(req);
    }));
  }
}
