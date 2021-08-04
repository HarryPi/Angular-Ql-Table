import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../button/button.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { QlTableComponent } from './ql-table.component';
import { TbodyComponent } from './tbody/tbody.component';
import { TheadComponent } from './thead/thead.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FilterComponent } from './filter/filter.component';



@NgModule({
  declarations: [
      QlTableComponent,
      TbodyComponent,
      TheadComponent,
      PaginationComponent,
      FilterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ButtonModule,
    MatMenuModule,
    FormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    QlTableComponent,
    TbodyComponent,
    TheadComponent,
    FilterComponent
  ]
})
export class QlTableModule { }
