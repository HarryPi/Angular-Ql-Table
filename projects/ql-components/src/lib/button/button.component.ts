import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { QlBaseStyle } from '../common/ql-base-style';

@Component({
  selector: 'ql-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends QlBaseStyle implements OnInit {

  @ViewChild('button') button: ElementRef<HTMLButtonElement> | undefined;

  @Input()
  disabled: boolean;

  @HostBinding('class.with-extra')
  private _isLoading: boolean;

  @Input()
  @HostBinding('style.--spinner-width')
  spinnerWidth: string;

  @Input()
  fab = false;

  constructor(
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer
  ) {
    super();
    this._matIconRegistry.addSvgIcon(
        'spinner',
        this._domSanitizer.bypassSecurityTrustResourceUrl('assets/spinner.svg')
    );

  }

  ngOnInit(): void {
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  @Input()
  set isLoading(loading: boolean) {
    this._isLoading = loading;
  }
}
