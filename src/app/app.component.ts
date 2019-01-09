import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng7-project';
  currentSection = 'recipes';

  sectionHandler(event) {
    this.currentSection = event;
  }


}
