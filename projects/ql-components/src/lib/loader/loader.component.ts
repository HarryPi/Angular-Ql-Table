import { ChangeDetectorRef, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export abstract class LoaderComponentToken {
  protected _isLoading: boolean | null = false;

  public abstract get isLoading(): boolean | null;
  public abstract set isLoading(value: boolean | null);
}

@Component({
  selector: 'ql-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends LoaderComponentToken implements OnChanges {

  @HostBinding('style.--table-width')
  private _itemWidth: number;

  @HostBinding('style.--table-height')
  private _itemHeight: number;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer,
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'hourglass',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/hourglass.svg')
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {  isLoading } = changes;
  }

  get isLoading(): boolean | null {
    return this._isLoading;
  }

  @Input()
  set isLoading(value: boolean | null) {
    this._isLoading = value;
  }

}
