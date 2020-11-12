import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'ql-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input() data: T[] | Observable<T[]>;

  @ViewChild('table') table: HTMLTableElement;

  public tableData: MatTableDataSource<T>;
  public columnDefs = [];

  private _destroy: Subject<void>;

  constructor(
  ) {
    this._destroy = new Subject<void>();
  }

  ngOnInit(): void {
    if (this.data instanceof Observable) {
      this.data.pipe(
          takeUntil(this._destroy),
          tap(tableData => {
            this.tableData = new MatTableDataSource<T>(tableData);
            this._createColumnDefs(tableData);
          })
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  private _createColumnDefs(tableData: T[]): void {
    const item: T = tableData.find(v => !!v);

    if (item) {
      this.columnDefs = [
        ...Object.getOwnPropertyNames(item)
      ];
    }
  }

}
