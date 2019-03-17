import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

interface CanDeactivateRecipe {
  canDeactivate: () => Observable<any> | Promise<any> | any;
}

export class CanDeactivateGuard implements CanDeactivate<CanDeactivateRecipe> {

  canDeactivate(component: CanDeactivateRecipe) {

    return component.canDeactivate ? component.canDeactivate() : true;

  }

}
