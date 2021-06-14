import { Enumeration } from './enumeration';

export class CalendarView extends Enumeration<number> {
  static readonly Month: CalendarView = new CalendarView({id: 0, name: 'Month'});
  static readonly Week: CalendarView = new CalendarView({id: 1, name: 'Week'});
  static readonly Day: CalendarView = new CalendarView({id: 2, name: 'Day'});

  constructor(calendarView?: Partial<CalendarView>) {
    super();
    const {
      id = 0,
      name = ''
    } = calendarView ?? {};

    this.id = id;
    this.name = name;
  }
}
