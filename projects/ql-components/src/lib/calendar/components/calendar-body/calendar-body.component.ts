import { AfterViewInit, Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { getDay, getDaysInMonth, getMonth, startOfMonth, subMonths } from 'date-fns';
import { TypedSimpleChanges } from '../../common/typed-simple-changes';
import { CalendarDay } from '../calendar-day/calendar-day.component';

export abstract class CalendarBody {
  protected _date: Date;

  abstract get date(): Date;
  abstract set date(value: Date);
}

@Component({
  selector: 'ql-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss'],
  providers: [{ provide: CalendarBody, useExisting: CalendarBodyComponent }]
})
export class CalendarBodyComponent extends CalendarBody implements OnInit, AfterViewInit, OnChanges {

  @ViewChildren(CalendarDay) calendarDays: QueryList<CalendarDay>;

  totalCalendarDisplayDays: number[];

  private _totalDaysOnCalendar = 42;

  constructor() {
    super();
    this.totalCalendarDisplayDays = [...new Array(this._totalDaysOnCalendar).keys()];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges & { date: TypedSimpleChanges<Date> }): void {
    if (changes.date && changes.date.currentValue && this.calendarDays) {
      this._populateCalendarWithDaysFromDate(changes.date.currentValue);
    }
  }

  get date(): Date {
    return this._date;
  }

  @Input()
  set date(value: Date) {
    this._date = value;
    this._populateCalendarWithDaysFromDate(value);
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
      this.calendarDays.get(dayNumber - 1).activeMonthDay = i ;
    }

    for (let i = daysInCurrentMonth + firstDayIndexCurrentMonth; i < this._totalDaysOnCalendar; i++) {
      const calendarDayComponent: CalendarDay = this.calendarDays.get(i);

      calendarDayComponent.notActiveMonthDay = i - (daysInCurrentMonth + firstDayIndexCurrentMonth) + 1;
    }

  }

}
