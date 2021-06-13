import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarBodyComponent } from '../../components/calendar-body/calendar-body.component';

@Component({
  selector: 'ql-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild(CalendarBodyComponent, {static: true})
  calendarBody!: CalendarBodyComponent;

  private _date: Date;

  constructor() {
    this.date = new Date();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
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
