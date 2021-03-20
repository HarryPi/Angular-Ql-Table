import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonComponent } from './button.component';



@NgModule({
  declarations: [
      ButtonComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatRippleModule
  ],
  exports: [
      ButtonComponent
  ]
})
export class ButtonModule { }
