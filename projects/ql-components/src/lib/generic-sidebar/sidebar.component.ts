import { AfterContentInit, Component, ContentChild, HostBinding, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../common/destroyable';
import { SidebarCollapseToken } from './sidebar-collapse/sidebar-collapse.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';

@Component({
  selector: 'ql-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent extends Destroyable implements OnInit, AfterContentInit {

  hasDivider: boolean;

  private _isCollapsed = false;

  @ContentChild(SidebarCollapseToken) sidebarCollapse: SidebarCollapseToken;
  @ContentChild(SidebarContentComponent) content: SidebarContentComponent;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.sidebarCollapse) {
      this.hasDivider = true;
      this.sidebarCollapse.collapseChange.pipe(takeUntil(this._onDestroy)).subscribe(next => {
        this.isCollapsed = next;
      });
    }
  }


  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  @HostBinding('class.is-collapsed')
  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
    if (this.content) {
      this.content.isCollapsed = value;
    }
  }
}
