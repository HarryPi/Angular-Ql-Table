import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { Destroyable } from '../../../common/destroyable';
import { SidebarItemToken } from '../sidebar-item/sidebar-item.component';

let id = 0;

export abstract class SidebarGroupToken extends Destroyable {

  public groupClicked: Subject<number>;
  public id: number;

  protected abstract _isSidebarCollapsed = false;
  protected abstract _isExpanded: boolean;


  get isExpanded(): boolean {
    return this._isExpanded;
  }

  set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  abstract get isSidebarCollapsed(): boolean;
  abstract set isSidebarCollapsed(value: boolean);

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
  @ContentChildren(SidebarItemToken) items: QueryList<SidebarItemToken>;

  @Output() groupClicked: Subject<number>;
  tooltipText: string;

  @HostBinding('class.has-icon')
  private _hasIcon: boolean;

  @HostBinding('class.is-expanded')
  protected _isExpanded: boolean;

  @HostBinding('class.is-collapsed')
  protected _isSidebarCollapsed = false;

  @HostBinding('class.always-open')
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
    this._hasIcon = this.icon.length > 0;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (Reflect.has(changes, 'isExpanded')) {
      this.isExpanded = Reflect.get(changes, 'isExpanded') as boolean;
    }

    if (Reflect.has(changes, 'alwaysOpen')) {
      this.alwaysOpen = Reflect.get(changes, 'alwaysOpen') as boolean;
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

    if (value) {
      this.hasIcon = false;
    }
  }

  get hasIcon(): boolean {
    return this._hasIcon;
  }

  set hasIcon(value: boolean) {
    this._hasIcon = value;
  }


  get isSidebarCollapsed(): boolean {
    return this._isSidebarCollapsed;
  }

  @Input()
  set isSidebarCollapsed(value: boolean) {
    this._isSidebarCollapsed = value;

    this.items.forEach(item => item.isSidebarCollapsed = value);
  }
}
