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

  @Output() public nextClicked: Subject<CalendarView>;
  @Output() public backClicked: Subject<CalendarView>;

  private _currentDate: Date;
  private _currentView: CalendarView;

  constructor() {
    this._currentView = CalendarView.Month;
    this.nextClicked = new Subject<CalendarView>();
    this.backClicked = new Subject<CalendarView>();
  }

  ngOnInit(): void {
  }

  getFormattedDate(): string {
    return format(this.currentDate, 'MMMM yyyy');
  }

  back(): void {
    this.backClicked.next(this._currentView);
  }

  next(): void {
    this.nextClicked.next(this._currentView);
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  @Input()
  set currentDate(value: Date) {
    this._currentDate = value;
  }
}
