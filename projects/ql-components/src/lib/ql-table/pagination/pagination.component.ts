import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { PaginationToken } from './pagination.token';

@Component({
  selector: 'ql-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [
    { provide: PaginationToken, useExisting: PaginationComponent }
  ]
})
export class PaginationComponent extends PaginationToken implements OnInit {

  @Output()
  public backButtonClickChange: Subject<void>;

  @Output()
  public nextButtonClickChange: Subject<void>;

  constructor() {
    super();
    this.backButtonClickChange = new Subject<void>();
    this.nextButtonClickChange = new Subject<void>();
  }

  ngOnInit(): void {
  }


  get position(): 'start' | 'end' {
    return this._position;
  }

  @Input()
  @HostBinding('style.--pagination-position')
  set position(value: 'start' | 'end') {
    this._position = value;
  }


  get isLeftButtonEnabled(): boolean {
    return this._isLeftButtonEnabled;
  }

  @Input()
  set isLeftButtonEnabled(value: boolean) {
    this._isLeftButtonEnabled = value;
  }

  get isRightButtonEnabled(): boolean {
    return this._isRightButtonEnabled;
  }

  @Input()
  set isRightButtonEnabled(value: boolean) {
    this._isRightButtonEnabled = value;
  }


}
