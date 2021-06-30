import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeeklyDayComponent } from './calendar-weekly-day.component';

describe('CalendarWeeklyDayComponent', () => {
  let component: CalendarWeeklyDayComponent;
  let fixture: ComponentFixture<CalendarWeeklyDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarWeeklyDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarWeeklyDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
