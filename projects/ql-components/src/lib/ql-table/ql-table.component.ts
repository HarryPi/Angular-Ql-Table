import {
  AfterContentInit, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild, ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit, Optional, Renderer2,
  SimpleChanges, ViewChild
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

  @Input() qlData: T[] | null;
  @Input() isLoading: boolean;

  @ViewChild('overlay')
  overlayRef!: ElementRef<HTMLDivElement>;

  @ContentChild(THeadToken) tHead: THeadToken;

  public data: ReadonlyArray<T>;

  @HostBinding('style.--col-count')
  private _colCount = 0;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
      private _self: ElementRef<HTMLElement>,
      private _renderer: Renderer2
  ) {
    this.qlData = [];
    this._matIconRegistry.addSvgIcon(
        'hourglass',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/hourglass.svg')
    );
  }

  ngOnInit(): void {
    this.data = [...this.qlData] as const;
  }

  ngAfterViewInit(): void {

    const element: HTMLElement = this._self.nativeElement;
    const overlay: HTMLElement = this.overlayRef.nativeElement;

    this._renderer.setStyle(overlay, 'width', `${ element.getBoundingClientRect().width }px`);
    this._renderer.setStyle(overlay, 'height', `${ element.getBoundingClientRect().height }px`);

    if (!this.isLoading) {
      this._renderer.addClass(overlay, 'hidden');
    }
  }

  ngAfterContentInit(): void {
    this._colCount = this.tHead.headerCols;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { qlData, isLoading } = changes;

    if (qlData) {
      this.data = [...qlData.currentValue];
    }

    if (isLoading) {
      this._renderer.addClass(this.overlayRef.nativeElement, 'hidden');
    } else {
      this._renderer.removeClass(this.overlayRef.nativeElement, 'hidden');
    }
  }

  private _activateLoadingOverlay(): void {

  }

}
