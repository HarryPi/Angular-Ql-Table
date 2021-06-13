export class CalendarDay {
  numericDay: number;

  constructor(calendarDay?: Partial<CalendarDay>) {
    const {
      numericDay = 0
    } = calendarDay ?? {};

    this.numericDay = numericDay;
  }
}
