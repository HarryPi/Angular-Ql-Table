import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PaintToolbarComponent } from './paint-toolbar.component';


@NgModule({
  declarations: [
    PaintToolbarComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaintToolbarComponent
  ],
  providers: []
})
export class PaintToolbarModule {
}
