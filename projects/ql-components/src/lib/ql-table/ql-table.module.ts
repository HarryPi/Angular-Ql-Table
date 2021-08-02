import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../button/button.module';
import { QlTableComponent } from './ql-table.component';
import { TbodyComponent } from './tbody/tbody.component';
import { TheadComponent } from './thead/thead.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
      QlTableComponent,
      TbodyComponent,
      TheadComponent,
      PaginationComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ButtonModule
  ],
  exports: [
    QlTableComponent,
    TbodyComponent,
    TheadComponent
  ]
})
export class QlTableModule { }
