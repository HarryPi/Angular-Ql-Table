import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from 'date-fns';
import { CalendarView } from '../../common/calendar-view';
import { CalendarBody } from '../../components/calendar-body/calendar-body.component';

@Component({
  selector: 'ql-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild(CalendarBody, {static: true}) private _calendarBody: CalendarBody;

  calendarViews = CalendarView;

  private _currentView: CalendarView;
  private _date: Date;
  private _interval: number;

  constructor() {
    this._date = new Date();
    this._currentView = CalendarView.Month;
    this._interval = 30;
  }

  ngOnInit(): void {
    this._calendarBody.date = this.date;
    this._calendarBody.interval = this.interval;
  }

  ngAfterViewInit(): void {

  }

  next(): void {
    switch (this._currentView) {
      case CalendarView.Month:
        this.date = addMonths(this._date, 1);
        break;
      case CalendarView.Week:
        this.date = addWeeks(this._date, 1);
        break;
      case CalendarView.Day:
        this.date = addDays(this._date, 1);
    }
    this._calendarBody.date = this.date;
  }

  back(): void {
    switch (this._currentView) {
      case CalendarView.Month:
        this.date = subMonths(this._date, 1);
        break;
      case CalendarView.Week:
        this.date = subWeeks(this._date, 1);
        break;
      case CalendarView.Day:
        this.date = subDays(this._date, 1);
    }
    this._calendarBody.date = this.date;
  }


  setCalendarView(view: CalendarView): void {
    this.currentView = view;
  }

  get date(): Date {
    return this._date;
  }

  @Input()
  set date(value: Date) {
    this._date = value;
  }

  get calendarBody(): CalendarBody {
    return this._calendarBody;
  }

  @Input()
  set calendarBody(value: CalendarBody) {
    this._calendarBody = value;
  }

  get currentView(): CalendarView {
    return this._currentView;
  }

  @Input()
  set currentView(value: CalendarView) {
    this._currentView = value;
  }

  get interval(): number {
    return this._interval;
  }

  @Input()
  set interval(value: number) {
    this._interval = value;
  }
}
