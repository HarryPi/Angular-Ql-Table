import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { getDaysInMonth, startOfMonth } from 'date-fns';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
  selector: 'ql-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit, AfterViewInit {
  @ViewChildren(CalendarDayComponent) calendarDays: QueryList<CalendarDayComponent>;

  totalCalendarDisplayDays: number[];

  private _date: Date;
  private _totalDaysOnCalendar = 42;

  constructor() {
    this.totalCalendarDisplayDays = [...new Array(this._totalDaysOnCalendar).keys()];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  get date(): Date {
    return this._date;
  }

  @Input()
  set date(value: Date) {
    // Get total days of current month when date changed
    const daysInMonth: number = getDaysInMonth(value);
    const firstDayOfMonth: Date = startOfMonth(value);

    // Get first day in numeric days are 0 -> 6
    const firstDayIndex: number = firstDayOfMonth.getDay();

    // Populate all days including this and afterwards with numbers
    for (let i = 0; i < daysInMonth; i++) {
      if (this.calendarDays) {
        const dayNumber: number = i + firstDayIndex;
        this.calendarDays.get(dayNumber).activeMonthDay = i + 1;
      }
    }

    // Find remaining calendar days we need to populate at the end
    const remainingDays: number = this._totalDaysOnCalendar - daysInMonth;
    for (let i = 1; i < remainingDays - 1; i++) {
      const nextMonthDay: number = daysInMonth + i + 1;
      const calendarDayComponent: CalendarDayComponent = this.calendarDays.get(nextMonthDay);

      calendarDayComponent.notActiveMonthDay = i;
    }

    // Find the total days of previous month
    const daysInPreviousMonth: number = getDaysInMonth(value.getMonth() === 0 ? 11 : value.getMonth() - 1);

    for (let i = firstDayOfMonth.getDay(); i > 0 ; i--) {
      const previousMonthDayComponent: CalendarDayComponent = this.calendarDays.get(i - 1);
      previousMonthDayComponent.notActiveMonthDay = daysInPreviousMonth - (firstDayOfMonth.getDay() - i);
    }

    this._date = value;
  }
}
