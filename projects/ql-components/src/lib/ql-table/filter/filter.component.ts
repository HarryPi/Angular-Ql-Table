import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';

export abstract class FilterComponentToken {
  public abstract filterChange: Subject<string>;
}

@Component({
  selector: 'ql-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: FilterComponentToken, useExisting: FilterComponent }
  ]
})
export class FilterComponent extends FilterComponentToken implements OnInit {
  @Output() public filterChange: Subject<string>;

  @ViewChild(MatMenuTrigger) filterMenu: MatMenuTrigger;

  filterForm: FormGroup;

  constructor() {
    super();

    this.filterChange = new Subject<string>();
    this.filterForm = new FormGroup({
      [this.filter]: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  resetClicked(): void {
    this.filterControl.setValue('');
    if (this.filterMenu) {
      this.filterMenu.closeMenu();
    }
    this.filterChange.next(undefined);
  }

  filterValueClicked(): void {
    if (this.filterMenu) {
      this.filterMenu.closeMenu();
    }
    this.filterChange.next(this.filterControl.value);
  }

  get filter(): string {
    return 'filter';
  }

  get filterControl(): FormControl {
    return this.filterForm.get(this.filter) as FormControl;
  }
}
