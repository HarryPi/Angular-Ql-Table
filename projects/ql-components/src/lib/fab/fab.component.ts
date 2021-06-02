import { animate, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnInit, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs';

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

  @ContentChildren(HTMLButtonElement)
  expandedItems: QueryList<HTMLButtonElement>;

  @Input()
  @HostBinding('class.disabled')
  disabled: boolean;

  @Output()
  isExpandedChanged: Subject<boolean>;

  isExpanded: boolean;

  constructor() {
    this.isExpanded = false;
    this.isExpandedChanged = new Subject<boolean>();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.expandedItems);
  }

  expand(): void {
    this.isExpanded = !this.isExpanded;
    this.isExpandedChanged.next(this.isExpanded);
  }
}
