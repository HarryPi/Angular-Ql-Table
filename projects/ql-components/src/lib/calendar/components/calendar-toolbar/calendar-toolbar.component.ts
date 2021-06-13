import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'ql-calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss']
})
export class CalendarToolbarComponent implements OnInit {

  private _currentDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

  getFormattedDate(): string {
    return format(this.currentDate, 'MMMM yyyy');
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  @Input()
  set currentDate(value: Date) {
    this._currentDate = value;
  }
}
