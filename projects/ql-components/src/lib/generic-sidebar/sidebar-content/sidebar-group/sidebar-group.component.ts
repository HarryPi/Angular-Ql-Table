import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

let id = 0;

export abstract class SidebarGroupToken {

  public groupClicked: Subject<number>;
  public isExpanded: boolean;
  public id: number;

  protected constructor() {
    this.id = id;
    id++;
  }
}

@Component({
  selector: 'ql-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  providers: [
    { provide: SidebarGroupToken, useExisting: SidebarGroupComponent }
  ],
  animations: [
    trigger('expanded', [
      state(':leave', style({ height: 0 })),
      transition(':enter', [style({height: 0, overflow: 'hidden'}), animate('.3s ease', style({height: '*'}))]),
      transition(':leave', [style({height: '*', overflow: 'hidden'}), animate('.3s ease', style({height: 0}))])
    ])
  ]
})
export class SidebarGroupComponent extends SidebarGroupToken implements OnInit {

  @Output() groupClicked: Subject<number>;
  @Input() @HostBinding('class.is-expanded') isExpanded: boolean;

  @HostListener('click') onClick(): void {
    this.groupClicked.next(this.id);
  }

  constructor() {
    super();
    this.groupClicked = new Subject<number>();
  }

  ngOnInit(): void {
  }

}
