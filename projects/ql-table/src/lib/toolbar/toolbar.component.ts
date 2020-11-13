import { AfterContentInit, Component, ContentChild, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Filter } from '../filter/filter';
import { Toolbar } from './toolbar';

@Component({
  selector: 'ql-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [
    { provide: Toolbar, useExisting: ToolbarComponent }
  ]
})
export class ToolbarComponent<T> extends Toolbar<T> implements OnInit, AfterContentInit, OnDestroy {

  /**
   * Get the filter if exists
   * @type {Filter<T> | null}
   */
  @ContentChild(Filter) filter: Filter<T> | null = null;

  private _color: string;
  private readonly _destroy: Subject<void>;

  constructor() {
    super();
    this._destroy = new Subject<void>();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  get color(): string {
    return this._color;
  }

  @Input() set color(value: string) {
    this._color = value;
  }

}
