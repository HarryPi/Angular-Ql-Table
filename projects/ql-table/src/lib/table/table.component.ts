import { AfterContentInit, Component, ContentChild, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Filter } from '../filter/filter';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'ql-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  @Input() data: T[] | Observable<T[]>;
  @Input() columnsToIgnore: string[];
  @Input() extra: string;
  @Input() extraTemplate: TemplateRef<any>;

  @ContentChild(Toolbar) toolbar: Toolbar<T> | null = null;
  @ContentChild(Filter) filter: Filter<T> | null = null;

  @ViewChild('table') table: HTMLTableElement;

  public tableData: MatTableDataSource<T>;
  public columnDefs = [];

  private _innerData: T[];
  private _destroy: Subject<void>;

  constructor() {
    this._destroy = new Subject<void>();
    this.columnsToIgnore = [];
  }

  ngOnInit(): void {
    if (this.data instanceof Observable) {
      this.data.pipe(
          takeUntil(this._destroy),
          tap(tableData => {
            this.tableData = new MatTableDataSource<T>(tableData);
            this._innerData = tableData;
            this._createColumnDefs(tableData);
          })
      ).subscribe();
    } else {
      this.tableData = new MatTableDataSource<T>(this.data);
      this._innerData = this.data;
      this._createColumnDefs(this.data);
    }
  }

  ngAfterContentInit(): void {
    if (this.filter) {
      // Subscribe to filter changes so that the table can be refreshed
      this.filter.inputValueChanged.pipe(
          takeUntil(this._destroy),
          tap((data) => {
            this.tableData.filter = data;
          })
      ).subscribe();
    }
  }

  ngOnChanges(): void {
    // Check for changes in the data if data is not an observable
    if (!(this.data instanceof Observable)) {
      if (this.tableData) {
        this._innerData = this.data;
        this.tableData.data = this.data;
        this._createColumnDefs(this._innerData);
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  /**
   * Dynamically create the column definitions for the table column headers by reflection
   * @param {T[]} tableData
   * @private
   */
  private _createColumnDefs(tableData: T[]): void {
    console.log(tableData);
    if (!tableData) {
      return;
    }

    // Find the first item
    const item: T = tableData.find(v => !!v);

    // If an item exists get the property names to use as table column headers
    if (item) {
      this.columnDefs = [
        ...Object.getOwnPropertyNames(item).filter(v => !this.columnsToIgnore.includes(v))
      ];
      if (this.extra && this.extraTemplate) {
        this.columnDefs.push(this.extra);
      }
    }
  }

  getColumnName(def: string): string {
    return def.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(' ');
  }
}
