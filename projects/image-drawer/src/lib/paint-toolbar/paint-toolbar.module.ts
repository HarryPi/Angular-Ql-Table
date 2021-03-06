import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import { ExtraToolbarComponent } from './extra-toolbar/extra-toolbar.component';
import { PaintToolbarComponent } from './paint-toolbar.component';


@NgModule({
  declarations: [
    PaintToolbarComponent,
    ColorSettingsComponent,
    ExtraToolbarComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [
    ColorSettingsComponent,
    PaintToolbarComponent
  ],
  providers: []
})
export class PaintToolbarModule {
}
