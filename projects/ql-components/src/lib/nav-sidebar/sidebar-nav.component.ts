import { Component, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Destroyable } from '../common/destroyable';
import { SidebarNavItem } from './sidebar-nav-item';

@Component({
  selector: 'ql-nav-sidebar',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent extends Destroyable implements OnInit, OnDestroy {

  @Input() autoDetectSelectionFromLink: boolean;
  @Input() sidebarItems: SidebarNavItem[];

  @Output() itemSelectionChange: Subject<SidebarNavItem>;

  @HostBinding('class.is-collapsed')
  collapsed: boolean;

  currentRoute: string;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private router: Router
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'arrow-right',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/arrow-right.svg')
    );
    this.collapsed = false;
    this.autoDetectSelectionFromLink = true;
    this.itemSelectionChange = new Subject<SidebarNavItem>();
  }

  ngOnInit(): void {
    this.router.events.pipe(
        filter(nav => nav instanceof NavigationStart),
        tap((navigation: RouterEvent) => this.currentRoute = navigation.url),
        takeUntil(this._onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    super.onDestroy();
  }

  collapseSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  itemClicked(item: SidebarNavItem): void {
    this.itemSelectionChange.next(item);
  }
}
