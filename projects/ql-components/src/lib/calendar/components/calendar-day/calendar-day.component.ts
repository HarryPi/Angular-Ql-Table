import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

export abstract class CalendarDay {
  protected _displayDate: number;
  protected _isNotActiveMonth: boolean;

  get isNotActiveMonth(): boolean {
    return this._isNotActiveMonth;
  }

  get displayDate(): number {
    return this._displayDate;
  }

  abstract set notActiveMonthDay(value: number);
  abstract set activeMonthDay(value: number);
}

@Component({
  selector: 'ql-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  providers: [{provide: CalendarDay, useExisting: CalendarDayComponent}]
})
export class CalendarDayComponent extends CalendarDay implements OnInit {

  constructor(
      private _changeRef: ChangeDetectorRef
  ) {
    super();
    this._displayDate = 0;
    this._isNotActiveMonth = false;
  }

  ngOnInit(): void {
  }


  get isNotActiveMonth(): boolean {
    return this._isNotActiveMonth;
  }

  get displayDate(): number {
    return this._displayDate;
  }

  @Input()
  set notActiveMonthDay(value: number) {
    this._displayDate = value;
    this._isNotActiveMonth = true;
    this._changeRef.detectChanges();
  }

  @Input()
  set activeMonthDay(value: number) {
    this._displayDate = value;
    this._isNotActiveMonth = false;
    this._changeRef.detectChanges();
  }
}
