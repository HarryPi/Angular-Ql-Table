import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ql-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {

  private _displayDate: number;
  private _isNotActiveMonth: boolean;

  constructor(
      private _changeRef: ChangeDetectorRef
  ) {
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
