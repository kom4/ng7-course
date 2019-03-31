import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, group, query, style, animate, state, sequence} from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('* => new, * => show', [
        style({
          'transform': 'translateX(-50px)',
          'opacity': 0
        }),
        animate('200ms ease-in-out'),
      ]),
      transition('show <=> edit', [
        query(':enter', style({transform: 'scale(0)'})),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        group([
          query(':leave', animate('0.2s ease-in', style({transform: 'scale(0)'}))),
          query(':enter', animate('0.3s ease-out', style({transform: 'scale(1)'})))
        ])
      ]),
      transition('new => void', [
        animate(1000, style({transform: 'scale(0)'}))
      ])
    ])
  ]
})

export class RecipesComponent {

  constructor() {}

  getDepth(outlet: RouterOutlet) {
    return outlet.activatedRouteData['depth'];
  }


}
