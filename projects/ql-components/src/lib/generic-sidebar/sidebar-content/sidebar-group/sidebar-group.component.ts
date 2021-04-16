import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ContentChild, ContentChildren,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList, Renderer2,
  SimpleChanges
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../../../common/destroyable';

let id = 0;

export abstract class SidebarGroupToken extends Destroyable {

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
    super();
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
export class SidebarGroupComponent extends SidebarGroupToken implements OnInit, OnChanges, AfterContentInit {

  @ContentChildren(MatIcon) icon: QueryList<MatIcon>;

  @Output() groupClicked: Subject<number>;

  @HostBinding('class.has-icon')
  private _hasIcon: boolean;

  @HostBinding('class.is-expanded')
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

  ngAfterContentInit(): void {
    if (this.icon.length > 0) {
      this._hasIcon = true;
    }
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

  get hasIcon(): boolean {
    return this._hasIcon;
  }

  set hasIcon(value: boolean) {
    this._hasIcon = value;
  }
}
