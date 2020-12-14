import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from './filter';

@Component({
  selector: 'ql-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: Filter, useExisting: FilterComponent }
  ]
})
export class FilterComponent<T> extends Filter<T> implements OnInit {

  @ViewChild('input') input: HTMLInputElement;

  @Input() label = 'Filter table';
  @Input() filterFn: (T) => boolean;

  @Output() inputValueChanged: Subject<string>;

  private _hasValue: boolean;

  constructor() {
    super();
    this.inputValueChanged = new Subject<string>();
  }

  ngOnInit(): void {
  }

  get hasValue(): boolean {
    return this._hasValue;
  }

  set hasValue(value: boolean) {
    this._hasValue = value;
  }

  inputChanged($event: Event & { target: { value: string } }): void {
    this.hasValue = !!$event.target.value;
    this.inputValueChanged.next($event.target.value);
  }
}
