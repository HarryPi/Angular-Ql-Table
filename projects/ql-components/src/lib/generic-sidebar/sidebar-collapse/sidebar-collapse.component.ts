import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

export abstract class SidebarCollapseToken {

  public abstract withDefaultIcon: boolean;

  protected _isCollapsed: boolean;

  protected constructor() {
    this._isCollapsed = false;
  }

  abstract collapseChange: Subject<boolean>;

  abstract collapse(): void;
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

  @Output()
  public collapseChange: Subject<boolean>;

  @HostBinding('class.is-collapsed')
  protected _isCollapsed: boolean;

  @HostBinding('class.rotate')
  @Input() withDefaultIcon = true;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'arrow-right',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/arrow-right.svg')
    );
    this.collapseChange = new Subject<boolean>();

  }

  ngOnInit(): void {
  }

  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.collapseChange.next(this.isCollapsed);
  }

  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  @Input()
  set isCollapsed(value: boolean) {
    this._isCollapsed = value;
  }
}
