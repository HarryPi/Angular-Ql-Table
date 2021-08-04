import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader.component';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
