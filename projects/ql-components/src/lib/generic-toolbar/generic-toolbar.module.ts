import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QlToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
  declarations: [
    QlToolbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QlToolbarComponent
  ]
})
export class GenericToolbarModule { }
