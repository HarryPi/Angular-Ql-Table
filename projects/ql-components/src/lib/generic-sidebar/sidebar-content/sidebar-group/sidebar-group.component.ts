import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';

let id = 0;

export abstract class SidebarGroupToken {

  public groupClicked: Subject<number>;
  protected _isExpanded: boolean;
  public id: number;


  get isExpanded(): boolean {
    return this._isExpanded;
  }

  set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  protected constructor() {
    this.id = id;
    id++;
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ql-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  providers: [
    { provide: SidebarGroupToken, useExisting: SidebarGroupComponent }
  ],
  animations: [
    trigger('expanded', [
      state(':leave', style({ height: 0 })),
      transition(':enter', [style({ height: 0, overflow: 'hidden' }), animate('.3s ease', style({ height: '*' }))]),
      transition(':leave', [style({ height: '*', overflow: 'hidden' }), animate('.3s ease', style({ height: 0 }))])
    ])
  ]
})
export class SidebarGroupComponent extends SidebarGroupToken implements OnInit, OnChanges {

  @Output() groupClicked: Subject<number>;

  @HostBinding('class.is-expanded')
  private _shouldBeExpanded: boolean;

  protected _isExpanded: boolean;
  protected _alwaysOpen: boolean;


  constructor(
      private _change: ChangeDetectorRef
  ) {
    super();
    this.groupClicked = new Subject<number>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (Reflect.has(changes, 'isExpanded')) {
      this.isExpanded = Reflect.get(changes, 'isExpanded');
    }

    if (Reflect.has(changes, 'alwaysOpen')) {
      this.alwaysOpen = Reflect.get(changes, 'alwaysOpen');
    }
  }

  expand(): void {
    this.groupClicked.next(this.id);
  }

  get isExpanded(): boolean {
    return this._isExpanded;
  }

  @Input()
  set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  get alwaysOpen(): boolean {
    return this._alwaysOpen;
  }

  @Input()
  set alwaysOpen(value: boolean) {
    this._alwaysOpen = value;
  }

}
