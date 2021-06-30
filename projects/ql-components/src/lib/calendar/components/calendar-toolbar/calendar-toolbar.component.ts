import { Component, Input, OnInit, Output } from '@angular/core';
import { addDays, addMonths, addWeeks, format, subDays, subMonths, subWeeks } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarView } from '../../common/calendar-view';

@Component({
  selector: 'ql-calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss']
})
export class CalendarToolbarComponent implements OnInit {

  @Output() public nextClicked: Subject<void>;
  @Output() public backClicked: Subject<void>;
  @Output() public monthlyClicked: Subject<void>;
  @Output() public weeklyClicked: Subject<void>;
  @Output() public dailyClicked: Subject<void>;

  calendarViews = CalendarView;

  private _currentDate: Date;
  private _calendarView: CalendarView;

  constructor() {
    this._calendarView = CalendarView.Month;
    this.nextClicked = new Subject<void>();
    this.backClicked = new Subject<void>();
    this.monthlyClicked = new Subject<void>();
    this.weeklyClicked = new Subject<void>();
    this.dailyClicked = new Subject<void>();
  }

  ngOnInit(): void {
  }

  getFormattedDate(): string {
    return format(this.currentDate, 'MMMM yyyy');
  }

  back(): void {
    this.backClicked.next();
  }

  next(): void {
    this.nextClicked.next();
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  @Input()
  set currentDate(value: Date) {
    this._currentDate = value;
  }

  get calendarView(): CalendarView {
    return this._calendarView;
  }

  @Input()
  set calendarView(value: CalendarView) {
    this._calendarView = value;
  }
}
