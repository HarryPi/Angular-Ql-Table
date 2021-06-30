import { AfterViewInit, Component, HostBinding, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import {
  eachMinuteOfInterval,
  endOfDay,
  getDay,
  getDaysInMonth,
  getHours,
  getMinutes,
  startOfDay,
  startOfMonth,
  subMonths
} from 'date-fns';
import { CalendarView } from '../../common/calendar-view';
import { TypedSimpleChanges } from '../../common/typed-simple-changes';
import { CalendarDay } from '../calendar-day/calendar-day.component';

export abstract class CalendarBody {
  protected _date: Date;
  protected _calendarView: CalendarView;
  protected _interval: number;

  abstract get date(): Date;
  abstract set date(value: Date);

  abstract get calendarView(): CalendarView;
  abstract set calendarView(value: CalendarView);

  abstract get interval(): number;
  abstract set interval(value: number);

}

@Component({
  selector: 'ql-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
  providers: [{ provide: CalendarBody, useExisting: CalendarBodyComponent }]
})
export class CalendarBodyComponent extends CalendarBody implements OnInit, AfterViewInit, OnChanges {

  @ViewChildren(CalendarDay) calendarDays: QueryList<CalendarDay>;

  hourIntervals: Date[];

  totalCalendarMonthlyDisplayDays: number[];
  totalCalendarWeeklyDisplayDays: number[];

  monthlyView = CalendarView.Month;
  weeklyView = CalendarView.Week;
  dailyView = CalendarView.Day;

  protected _calendarView: CalendarView;
  protected _interval: number;

  private _totalDaysOnMonthlyCalendar = 42;
  private _totalDaysOnWeeklyCalendar = 7;
  @HostBinding('class.isNotMonthView')
  private _isNotMonthView: boolean;

  constructor() {
    super();

    this._isNotMonthView = false;
    this.totalCalendarMonthlyDisplayDays = [...new Array(this._totalDaysOnMonthlyCalendar).keys()];
    this.totalCalendarWeeklyDisplayDays = [...new Array(this._totalDaysOnWeeklyCalendar).keys()];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('body after view init');
    this.hourIntervals = eachMinuteOfInterval({
      start: startOfDay(this._date),
      end: endOfDay(this._date)
    }, {
      step: this.interval
    });
  }

  ngOnChanges(changes: SimpleChanges & { date: TypedSimpleChanges<Date> }): void {
    if (changes.date && changes.date.currentValue && this.calendarDays) {
      this._populateCalendarWithDaysFromDate(changes.date.currentValue);
    }
  }

  getHoursFn(hour: Date): string {
    const hours: number = getHours(hour);
    return hours.toString().length === 1 ? `0${hours}` : hours.toString();
  }

  getMinutesFn(hour: Date): string {
    const minutes: number = getMinutes(hour);
    return minutes.toString().length === 1 ? `0${minutes}` : minutes.toString();
  }

  get date(): Date {
    return this._date;
  }

  @Input()
  set date(value: Date) {
    this._date = value;
    if (this.calendarDays) {
      this._populateCalendarWithDaysFromDate(value);
    }
  }

  private _populateCalendarWithDaysFromDate(value: Date): void {
    // Get total days of current month when date changed
    const daysInCurrentMonth: number = getDaysInMonth(value);
    // Actual first day as Date
    const firstDayOfCurrentMonth: Date = startOfMonth(value);

    // Get first day in numeric days are 0 -> 6
    const firstDayIndexCurrentMonth: number = getDay(firstDayOfCurrentMonth);

    // Populate all days including this and afterwards with numbers
    // Find the total days of previous month
    const daysInPreviousMonth: number = getDaysInMonth(subMonths(value, 1));

    for (let i = firstDayIndexCurrentMonth; i > 0; i--) {
      const previousMonthDayComponent: CalendarDay = this.calendarDays.get(i - 1);
      previousMonthDayComponent.notActiveMonthDay = daysInPreviousMonth - (firstDayIndexCurrentMonth - i);
    }

    // First populate the days before this month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const dayNumber: number = i + firstDayIndexCurrentMonth;
      this.calendarDays.get(dayNumber - 1).activeMonthDay = i;
    }

    for (let i = daysInCurrentMonth + firstDayIndexCurrentMonth; i < this._totalDaysOnMonthlyCalendar; i++) {
      const calendarDayComponent: CalendarDay = this.calendarDays.get(i);

      calendarDayComponent.notActiveMonthDay = i - (daysInCurrentMonth + firstDayIndexCurrentMonth) + 1;
    }

  }

  get calendarView(): CalendarView {
    return this._calendarView;
  }

  @Input()
  set calendarView(value: CalendarView) {
    this._calendarView = value;
    this._isNotMonthView = value !== CalendarView.Month;
  }

  get interval(): number {
    return this._interval;
  }

  @Input()
  set interval(value: number) {
    this._interval = value;
  }
}
