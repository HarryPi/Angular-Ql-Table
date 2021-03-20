import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ql-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('button') button: ElementRef<HTMLButtonElement> | undefined;

  @Input() disabled: boolean;
  @Input() isLoading: boolean;
  @Input() color: 'primary' | 'ascent' | 'simple';


  constructor(
      private _renderer: Renderer2,
      private _matIconRegistry: MatIconRegistry,
      private _domSanitizer: DomSanitizer
  ) {
      this._matIconRegistry.addSvgIcon(
          'spinner',
          this._domSanitizer.bypassSecurityTrustResourceUrl('assets/spinner.svg')
      );

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._setSpinnerClass();
  }

  ngOnChanges(): void {
    if (this.button) {
      this._setSpinnerClass();
    }
  }

  private _setSpinnerClass(): void {
    if (this.isLoading) {
      this._renderer.addClass(this.button.nativeElement, 'with-extra');
    } else {
      this._renderer.removeClass(this.button.nativeElement, 'with-extra');
    }
  }

}
