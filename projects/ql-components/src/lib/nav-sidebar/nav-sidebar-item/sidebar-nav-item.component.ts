import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidebarNavItem } from '../sidebar-nav-item';

@Component({
  selector: 'ql-nav-sidebar-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss']
})
export class SidebarNavItemComponent implements OnInit {

  @Input() item: SidebarNavItem;
  @HostBinding('class.is-collapsed') @Input() showIconOnly: boolean;
  @Input() currentRoute: string;

  constructor() {
    this.showIconOnly = false;
  }

  ngOnInit(): void {
  }

}
