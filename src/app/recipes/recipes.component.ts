import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, group, query, style, animate} from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('routeAnimation', [
        transition('* => 2, * => 3', [
          style({
            'transform': 'translateX(-50px)',
            'opacity': 0
          }),
          query(':leave', style({ position: 'absolute', top: 0, right: 0})),
          group([
            animate(100, style({
              'transform': 'translateX(0px)',
              'opacity': 1
            })),
            query(':leave', [
              animate('0.1s', style({ transform: 'translateX(-200px)' })),
          ], {optional: true}),

          ])
        ]),
    ])
]
})

export class RecipesComponent {

  constructor() {}

  getDepth(outlet: RouterOutlet) {
    return outlet.activatedRouteData['depth'];
  }

}
