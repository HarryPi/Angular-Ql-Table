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

  @ViewChild(CalendarBody) calendarBody: CalendarBody;

  private _date: Date;

  constructor() {
    this._date = new Date();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.calendarBody.date = this.date;
  }

  next(view: CalendarView): void {
    switch (view) {
      case CalendarView.Month:
        this.date = addMonths(this._date, 1);
        break;
      case CalendarView.Week:
        this.date = addWeeks(this._date, 1);
        break;
      case CalendarView.Day:
        this.date = addDays(this._date, 1);
    }
    this.calendarBody.date = this.date;
  }

  back(view: CalendarView): void {
    switch (view) {
      case CalendarView.Month:
        this.date = subMonths(this._date, 1);
        break;
      case CalendarView.Week:
        this.date = subWeeks(this._date, 1);
        break;
      case CalendarView.Day:
        this.date = subDays(this._date, 1);
    }
    this.calendarBody.date = this.date;
  }


  get date(): Date {
    return this._date;
  }

  @Input()
  set date(value: Date) {
    this._date = value;
  }

}
