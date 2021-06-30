import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren, Input,
  OnChanges, OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { Destroyable } from '../../common/destroyable';
import { SidebarGroupToken } from './sidebar-group/sidebar-group.component';
import { SidebarItemToken } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'ql-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent extends Destroyable implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(SidebarGroupToken) groups: QueryList<SidebarGroupToken>;
  @ContentChildren(SidebarItemToken) items: QueryList<SidebarItemToken>;

  private _isCollapsed = false;
  private _existingGroups: SidebarGroupToken[];

  private _groupObserver: ReplaySubject<boolean>;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private _change: ChangeDetectorRef
  ) {
    super();
    this._existingGroups = [];
    this._matIconRegistry.addSvgIcon(
        'arrow',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/sidebar-arrow.svg')
    );

    this._groupObserver = new ReplaySubject<boolean>(1);
  }

  ngOnInit(): void {
  }


  ngAfterContentInit(): void {
    // This here is to ensure if the content changes we observe the changes and resubscribe as this wont trigger ngonchanges
    this.groups.changes.pipe(takeUntil(this._onDestroy)).subscribe((groups: QueryList<SidebarGroupToken>) => {
      const groupsToObserve: SidebarGroupToken[] =
          groups.filter(newGroups => this._existingGroups.every(existingGroup => existingGroup.id !== newGroups.id));
      this._setGroupExpanded(groupsToObserve);
    });
    this._existingGroups = this.groups.map(g => g);
    this._setGroupExpanded(this._existingGroups);
  }

  ngOnDestroy(): void {
    this.onDestroy();
  }

  private _setGroupExpanded(groups: SidebarGroupToken[]): void {
    groups.forEach(group => group.groupClicked.pipe(
        tap(clickedId => {
          // iterate all groups and set as not selected except where id matches
          // There set reverse of what is currently the option
          this.groups.forEach(g => {

            if (g.id === clickedId) {
              g.isExpanded = !g.isExpanded;
            } else {
              g.isExpanded = false;
            }
          });
          this._change.detectChanges();
        }),
        takeUntil(this._onDestroy)
    ).subscribe());
  }


  get isCollapsed(): boolean {
    return this._isCollapsed;
  }

  @Input()
  set isCollapsed(value: boolean) {
    this._isCollapsed = value;

    this.groups.forEach(group => {
      group.isSidebarCollapsed = value;
    });

    this.items.forEach(item => {
      item.isSidebarCollapsed = value;
    });
  }
}
