import { Component, OnInit } from '@angular/core';
import { DaysOfWeek } from '../../common/days-of-week';

@Component({
  selector: 'ql-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {


  allDays: DaysOfWeek[] = DaysOfWeek.allDays;

  constructor() {
  }

  ngOnInit(): void {
  }

  dateIndexTracker(index: number, day: DaysOfWeek): number {
    return day.id;
  }

}
