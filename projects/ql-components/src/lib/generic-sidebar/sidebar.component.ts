import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { Destroyable } from '../common/destroyable';
import { SidebarCollapseToken } from './sidebar-collapse/sidebar-collapse.component';

@Component({
  selector: 'ql-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends Destroyable implements OnInit, AfterContentInit {

  hasDivider: boolean;

  @ContentChild(SidebarCollapseToken) sidebarCollapse: SidebarCollapseToken;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.sidebarCollapse) {
      this.hasDivider = true;
    }
  }

}
