import { Directive, HostBinding, Input } from '@angular/core';

export abstract class SidebarHeaderItemToken {
  isActive: boolean;
}

@Directive({
  selector: '[qlSidebarHeaderItem]',
  providers: [
    { provide: SidebarHeaderItemToken, useExisting: SidebarHeaderItemDirective }
  ],
  host: {
    class: 'header-item'
  }
})
export class SidebarHeaderItemDirective extends SidebarHeaderItemToken {

  @Input() @HostBinding('class.selected') isActive: boolean;

  constructor() {
    super();
  }

}
