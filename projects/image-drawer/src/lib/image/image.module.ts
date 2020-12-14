import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ImageComponent } from './image.component';


@NgModule({
  declarations: [ImageComponent],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ImageComponent
  ]
})
export class ImageModule {
}
