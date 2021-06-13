import { Enumeration } from './enumeration';

/**
 * Days of the week based of date-fns
 */
export class DaysOfWeek extends Enumeration<number> {
  public static readonly monday = new DaysOfWeek({ id: 1, name: 'Monday' , shorthand: 'Mon'});
  public static readonly tuesday = new DaysOfWeek({ id: 2, name: 'Tuesday', shorthand: 'Tue' });
  public static readonly wednesday = new DaysOfWeek({ id: 3, name: 'Wednesday', shorthand: 'Wed' });
  public static readonly thursday = new DaysOfWeek({ id: 4, name: 'Thursday', shorthand: 'Thu' });
  public static readonly friday = new DaysOfWeek({ id: 5, name: 'Friday', shorthand: 'Fri' });
  public static readonly saturday = new DaysOfWeek({ id: 6, name: 'Saturday', shorthand: 'Sat' });
  public static readonly sunday = new DaysOfWeek({ id: 0, name: 'Sunday', shorthand: 'Sun' });
  public static readonly allDays = [
    DaysOfWeek.sunday,
    DaysOfWeek.monday,
    DaysOfWeek.tuesday,
    DaysOfWeek.wednesday,
    DaysOfWeek.thursday,
    DaysOfWeek.friday,
    DaysOfWeek.saturday,
  ];

  public shorthand: string;

  constructor(dayOfWeek?: Partial<DaysOfWeek>) {
    super();
    const {
      id = 0,
      name = '',
      shorthand = ''
    } = dayOfWeek ?? {};

    this.id = id;
    this.name = name;
    this.shorthand = shorthand;
  }

  static getDayName(day: number): string {
    return DaysOfWeek.allDays[day].name;
  }
}
