import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

export abstract class SidebarCollapseToken {

  public abstract withDefaultIcon: boolean;

  protected isCollapsed: boolean;

  constructor() {
    this.isCollapsed = false;
    this.collapseChange = new Subject<boolean>();
  }

  collapseChange: Subject<boolean>;

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseChange.next(this.isCollapsed);
  }
}

@Component({
  selector: 'ql-sidebar-collapse',
  templateUrl: './sidebar-collapse.component.html',
  styleUrls: ['./sidebar-collapse.component.scss'],
  providers: [
    { provide: SidebarCollapseToken, useExisting: SidebarCollapseComponent }
  ]
})
export class SidebarCollapseComponent extends SidebarCollapseToken implements OnInit {

  @HostBinding('class.rotate')
  @Input() withDefaultIcon: boolean;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'arrow-right',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/arrow-right.svg')
    );
  }

  ngOnInit(): void {
  }


}
