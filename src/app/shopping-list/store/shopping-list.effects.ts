import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as ShoppingListActions from './shopping-list.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ShoppingListEffects {

    constructor(private actions$: Actions) {}

    @Effect() resetIndex$ = this.actions$.pipe(
        ofType(ShoppingListActions.DELETE_INGREDIENT),
        map(() => {
            return new ShoppingListActions.ResetRemovedIngredientIndex();
        })
    );



}
