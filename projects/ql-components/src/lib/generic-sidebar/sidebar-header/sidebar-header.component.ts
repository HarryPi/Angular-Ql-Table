import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, Renderer2 } from '@angular/core';
import { SidebarHeaderItemToken } from './sidebar-header-item.directive';

@Component({
  selector: 'ql-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit, AfterContentInit {

  @ContentChildren(SidebarHeaderItemToken) items: QueryList<SidebarHeaderItemToken>;

  constructor(
      private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    const totalItems: number = this.items.length;
  }


}
