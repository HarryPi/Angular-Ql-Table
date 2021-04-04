import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnChanges,
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

@Component({
  selector: 'ql-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent extends Destroyable implements OnInit, AfterContentInit, OnChanges {

  @ContentChildren(SidebarGroupToken) groups: QueryList<SidebarGroupToken>;

  private _groupObserver: ReplaySubject<boolean>;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private _change: ChangeDetectorRef
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'arrow',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/sidebar-arrow.svg')
    );

    this._groupObserver = new ReplaySubject<boolean>(1);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Reflect.get(changes, 'groups')) {
      this._setGroupExpanded();
    }
  }

  ngAfterContentInit(): void {
    // This here is to ensure if the content changes we observe the changes and resubscribe as this wont trigger ngonchanges
    this.groups.changes.pipe(takeUntil(this._onDestroy)).subscribe(groups => {
      this._setGroupExpanded();
    });
    this._setGroupExpanded();
  }

  private _setGroupExpanded(): void {
    this.groups.forEach(group => group.groupClicked.pipe(
        tap(() => {
              // Check if previous subscription exist if yes destroy
              let isSubscribed: boolean;
              this._groupObserver.pipe(take(1)).subscribe(s => isSubscribed = s);
              if (isSubscribed) {
                this._groupObserver.next(true);
              }
            }
        ),
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
        takeUntil(this._groupObserver)
    ).subscribe());
  }
}
