import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import Recipe from '../recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';
import * as RecipeActions from './../store/recipe.actions';
import { State } from '../../auth/store/auth.reducers';
import { trigger, style, transition, animate, query, group, state } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [
    trigger('animateRecipes', [

      transition('* => up', [
        query('.recipe', style({transform: 'translateY(-50%)'}), {optional: true}),
        query('.recipe', animate('300ms ease-out', style({transform: 'translateY(0px)'})))
      ]),
      transition('* => down', [
        query('.recipe', style({transform: 'translateY(50%)'}), {optional: true}),
        query('.recipe', animate('300ms ease-out', style({transform: 'translateY(0px)'})))
      ]),
    ])
  ]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  recipe: Recipe;
  recipeIndex: number = null;
  recipeSubscription: Subscription;
  isAuthenticated: Observable<boolean>;
  routeParamsSub: Subscription;
  recipeAnimationNumber: number;
  animationDirection: string;

  ngOnInit() {
    this.recipeSubscription = this.route.data.subscribe((data: Recipe) => {
      [this.recipe, this.recipeIndex] = data['recipeData'];
    });

    this.isAuthenticated = this.store.select('auth').pipe(map((authState: State) => {
      return authState.authenticated;
    }));

    this.routeParamsSub = this.route.params.subscribe((params) => {
      this.animationDirection = (+params['id'] > this.recipeAnimationNumber) ? 'down' : 'up';
      this.recipeAnimationNumber = +params['id'];
    });
  }

  ingredientsToShoppingList() {
    const newIngredients = JSON.parse(JSON.stringify(this.recipe.ingredients));
    this.store.dispatch(new ShoppingListActions.AddIngredients(newIngredients));
  }

  onDeleteRecipe() {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeIndex));
      this.router.navigate(['/recipes']);
    }
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.routeParamsSub.unsubscribe();
  }

  afterAnimation () {
    this.animationDirection = '';
  }

}
