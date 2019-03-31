import { trigger, style, transition, animate, query, stagger, state } from '@angular/animations';

export const animations = [
    trigger('moveInList', [
        transition(':enter', [
          query('a', style({ transform: 'translateX(-100px)', opacity: 0}), {optional: true}),
          query('a',
            stagger('50ms', [
              animate('100ms', style({ transform: 'translateX(0px)', opacity: 1}))
          ]), {optional: true})
        ])
      ]),

      trigger('moveIn', [
        state('normal', style({
          'transform': 'scale(1)',
        })),
        transition('void => normal', [
          style({
            'transform': 'scale(0)',
          }),
          animate(200)
        ]),
      ]),

       trigger('moveOut', [
        state('normal', style({'transform': 'scale(1)'})),
        state('move', style({'transform': 'scale(0)', 'background-color': 'red', 'height': 0, 'margin': 0, 'padding': 0, 'opacity': 0 })),
        transition('normal => move', [
          animate(200)
        ])
       ]),

       trigger('hover', [
         state('large', style({ 'transform': 'scale(1.05)', 'z-index': '100'})),
         transition('normal <=> large', [
           animate(100)
         ])
       ])

];
