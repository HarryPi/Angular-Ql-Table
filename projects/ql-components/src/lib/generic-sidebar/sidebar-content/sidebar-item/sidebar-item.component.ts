import { AfterContentInit, Component, ContentChild, HostBinding, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ql-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit, AfterContentInit {

  @ContentChild(MatIcon) icon: MatIcon | undefined;

  @HostBinding('class.has-icon')
  private _hasIcon = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.icon) {
      this.hasIcon = true;
    }
  }

  get hasIcon(): boolean {
    return this._hasIcon;
  }

  set hasIcon(value: boolean) {
    this._hasIcon = value;
  }
}
