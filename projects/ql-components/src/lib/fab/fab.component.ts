import { animate, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ql-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  animations: [
    trigger('expandHide', [
      transition(':enter', [
        style({
          opacity: 0,
          height: '0%'
        }),
        animate('100ms', style({ opacity: 1, height: '100%' }))
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class FabComponent implements OnInit, AfterContentInit {

  @ContentChildren(ButtonComponent)
  expandedItems: QueryList<ButtonComponent>;

  @Input()
  @HostBinding('class.disabled')
  disabled: boolean;

  @Output()
  isExpandedChanged: Subject<boolean>;

  isExpanded: boolean;

  @HostBinding('style.--list-items')
  private _totalListItems: number;

  constructor() {
    this.isExpanded = false;
    this.isExpandedChanged = new Subject<boolean>();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    const length: number = this.expandedItems.length;

    length > 2 ? this._totalListItems = length + 1 : this._totalListItems = length + 0.5;
  }

  expand(): void {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChanged.next(this.isExpanded);
  }
}
