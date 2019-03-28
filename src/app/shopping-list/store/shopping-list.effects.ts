import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as ShoppingListActions from './shopping-list.actions';
import { map, mergeMap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ShoppingListEffects {

    constructor(private actions$: Actions) { }

    @Effect() faterAddAndUpdate$ = this.actions$.pipe(
        ofType(ShoppingListActions.ADD_INGREDIENT, ShoppingListActions.UPDATE_INGREDIENT),
        mergeMap(() => {
            return of (new ShoppingListActions.ResetIngredientIndexes()).pipe(delay(500));
        })
    );
}
