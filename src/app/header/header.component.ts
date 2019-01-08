import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: '<app-header>',
    templateUrl: '/header.component.html',
    // styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  section = '';
  @Output() sectionEmitter = new EventEmitter<string>();

  sectionShowHandler(section: string) {
    this.section = section;
    this.sectionEmitter.emit(this.section);
  }

    constructor() {}

    ngOnInit() {}

}
