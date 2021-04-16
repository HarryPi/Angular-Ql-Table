import { AfterContentInit, Component, ContentChild, HostBinding, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export abstract class SidebarItemToken {
  protected _isSelected = false;

  get isSelected(): boolean {
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    this._isSelected = value;
  }
}

@Component({
  selector: 'ql-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
  providers: [
    { provide: SidebarItemToken, useExisting: SidebarItemComponent }
  ]
})
export class SidebarItemComponent extends SidebarItemToken implements OnInit, AfterContentInit {

  @ContentChild(MatIcon) icon: MatIcon | undefined;

  @HostBinding('class.is-selected')
  protected _isSelected = false;

  @HostBinding('class.has-icon')
  private _hasIcon = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.isSelected);
  }

  ngAfterContentInit(): void {
    if (this.icon) {
      this.hasIcon = true;
    }
  }


  get isSelected(): boolean {
    return this._isSelected;
  }

  @Input()
  set isSelected(value: boolean) {
    this._isSelected = value;
  }

  get hasIcon(): boolean {
    return this._hasIcon;
  }

  set hasIcon(value: boolean) {
    this._hasIcon = value;
  }
}
