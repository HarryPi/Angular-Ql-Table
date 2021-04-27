import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';

export abstract class THeadToken {
  protected abstract _headerCols: number;

  abstract set headerCols(value: number);
  abstract get headerCols(): number;
}

@Component({
  selector: 'ql-thead',
  templateUrl: './thead.component.html',
  styleUrls: ['./thead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'rowgroup'
  },
  providers: [
    { provide: THeadToken, useExisting: TheadComponent }
  ]
})
export class TheadComponent extends THeadToken implements OnInit, AfterContentInit {

  protected _headerCols: number;

  constructor(
      private _element: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    // Get native HTML Element
    const nativeElement: HTMLElement = this._element.nativeElement;

    // Get the row then the header cells
    this.headerCols = nativeElement.querySelector('tr').querySelectorAll('th').length;
  }


  get headerCols(): number {
    return this._headerCols;
  }

  set headerCols(value: number) {
    this._headerCols = value;
  }
}
