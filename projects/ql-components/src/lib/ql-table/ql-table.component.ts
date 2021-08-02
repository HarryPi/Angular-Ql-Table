import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { THeadToken } from './thead/thead.component';

@Component({
  selector: 'ql-table',
  templateUrl: './ql-table.component.html',
  styleUrls: ['./ql-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class QlTableComponent<T> implements OnInit, AfterViewInit, AfterContentInit, OnChanges {

  @Input()
  @HostBinding('style.--min-table-height')
  minHeight?: number;

  @Input()
  @HostBinding('style.--min-table-width')
  minWidth?: number;

  @HostBinding('style.--table-width')
  private _tableWidth: number;

  @HostBinding('style.--table-height')
  private _tableHeight: number;

  @Input() qlData: T[] | null;
  @Input() isLoading: boolean;
  @Input() isEmpty: boolean;
  @Input() itemsToDisplay: number;

  @ViewChild('overlay')
  overlayRef!: ElementRef<HTMLDivElement>;

  @ViewChild('emptyOverlay')
  emptyOverlayRef!: ElementRef<HTMLDivElement>;

  @ContentChild(THeadToken) tHead: THeadToken;

  public data: ReadonlyArray<T>;

  @HostBinding('style.--col-count')
  private _colCount = 0;

  public index: number;
  public maxIndex: number;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private _self: ElementRef<HTMLElement>,
      private _renderer: Renderer2,
      private _changeRef: ChangeDetectorRef
  ) {
    this.index = 0;
    this.qlData = [];
    this.isEmpty = true;
    this.itemsToDisplay = 5;
    this._matIconRegistry.addSvgIcon(
        'hourglass',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/hourglass.svg')
    );
    this._matIconRegistry.addSvgIcon(
        'emptyTable',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/empty-table.svg')
    );
    this._matIconRegistry.addSvgIcon(
        'pg-arrow-right',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/pagination-arrow-right.svg')
    );
    this._matIconRegistry.addSvgIcon(
        'pg-arrow-left',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/pagination-arrow-left.svg')
    );
  }

  ngOnInit(): void {
    this.data = [...this.qlData?.slice(0, this.itemsToDisplay) ?? []] as const;

    this.isEmpty = this.data.length === 0 && !this.isLoading;
    this.maxIndex = Math.floor(this.qlData?.length / this.itemsToDisplay);

    const element: HTMLElement = this._self.nativeElement;
    this._tableWidth = Math.floor(element.getBoundingClientRect().width);
    this._tableHeight = Math.floor(element.getBoundingClientRect().height);
  }

  ngAfterViewInit(): void {
  }

  ngAfterContentInit(): void {
    this._colCount = this.tHead.headerCols;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { qlData, isLoading } = changes;

    if (qlData?.currentValue as []) {
      this.data = [...qlData.currentValue?.slice(this.index * this.itemsToDisplay, this.itemsToDisplay * (this.index + 1))];
      this.maxIndex = Math.floor(this.qlData?.length / this.itemsToDisplay);
    }

    this.isEmpty = this.data?.length === 0 && !this.isLoading;
  }


  changeIndexBy(change: number): void {
    this.index += change;
    this.data = [...this.qlData?.slice(this.index * this.itemsToDisplay, this.itemsToDisplay * (this.index + 1))];
  }
}
