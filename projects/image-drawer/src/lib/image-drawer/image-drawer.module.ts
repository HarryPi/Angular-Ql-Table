import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDrawerComponent } from './image-drawer.component';



@NgModule({
  declarations: [
      ImageDrawerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      ImageDrawerComponent
  ]
})
export class ImageDrawerModule { }
