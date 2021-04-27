import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { QlTableComponent } from './ql-table.component';
import { TbodyComponent } from './tbody/tbody.component';
import { TheadComponent } from './thead/thead.component';



@NgModule({
  declarations: [
      QlTableComponent,
      TbodyComponent,
      TheadComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    QlTableComponent,
    TbodyComponent,
    TheadComponent
  ]
})
export class QlTableModule { }
