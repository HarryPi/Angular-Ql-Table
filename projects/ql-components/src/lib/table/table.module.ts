import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

const EXPORT_DECLARATIONS = [
  TableComponent
];

@NgModule({
  declarations: [
    EXPORT_DECLARATIONS
  ],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports: [
    EXPORT_DECLARATIONS
  ]
})
export class TableModule {
}
