import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../button/button.module';
import { CalendarComponent } from './page/calendar/calendar.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarBodyComponent } from './components/calendar-body/calendar-body.component';
import { CalendarDayComponent } from './components/calendar-day/calendar-day.component';
import { CalendarToolbarComponent } from './components/calendar-toolbar/calendar-toolbar.component';



@NgModule({
  declarations: [
      CalendarComponent,
      CalendarHeaderComponent,
      CalendarBodyComponent,
      CalendarDayComponent,
      CalendarToolbarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MatIconModule
  ],
  exports: [
      CalendarComponent
  ]
})
export class CalendarModule { }
