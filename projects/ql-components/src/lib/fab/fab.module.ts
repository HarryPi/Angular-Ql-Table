import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { FabComponent } from './fab.component';


@NgModule({
  declarations: [
    FabComponent
  ],
  imports: [
    CommonModule,
    MatRippleModule
  ],
  exports: [
    FabComponent
  ]
})
export class FabModule {
}
