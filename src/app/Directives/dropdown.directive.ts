import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave') closeDropdown() {
    this.isOpen = false;
  }

}
