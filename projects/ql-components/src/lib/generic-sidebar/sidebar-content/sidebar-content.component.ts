import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil, tap } from 'rxjs/operators';
import { Destroyable } from '../../common/destroyable';
import { SidebarGroupToken } from './sidebar-group/sidebar-group.component';

@Component({
  selector: 'ql-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent extends Destroyable implements OnInit, AfterContentInit {

  @ContentChildren(SidebarGroupToken) groups: QueryList<SidebarGroupToken>;

  private _selectedGroup: number;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'arrow',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/sidebar-arrow.svg')
    );
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.groups.forEach(group => group.groupClicked.pipe(
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
        }),
        takeUntil(this._onDestroy)
    ).subscribe());
  }
}
