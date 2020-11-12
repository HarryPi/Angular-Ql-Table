import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ql-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @ViewChild('input') input: HTMLInputElement;

  @Input() label = 'Filter table';

  private _hasValue: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  get hasValue(): boolean {
    return this._hasValue;
  }

  set hasValue(value: boolean) {
    this._hasValue = value;
  }
}
