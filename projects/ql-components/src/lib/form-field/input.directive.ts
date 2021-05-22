import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { InputToken } from './input';

@Directive({
  selector: '[qlInput]',
  providers: [
    { provide: InputToken, useExisting: InputDirective }
  ],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'input-field'
  }
})
export class InputDirective extends InputToken implements AfterContentInit, OnDestroy {

  @Input() height: string;

  private _classChangeObserver: MutationObserver;

  constructor(
      protected _elementRef: ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
      @Optional() @Self() public ngControl: NgControl
  ) {
    super();
  }


  @HostListener('focusout')
  onFocus(): void {
    this.hasError.next(this.ngControl.touched && this.ngControl.invalid);
  }

  ngAfterContentInit(): void {
    // Observe class changes for input
    this._classChangeObserver = new MutationObserver(mutations => {
      mutations.forEach(m => {
          if ((m.target as HTMLElement).classList.contains('ng-invalid') && (m.target as HTMLElement).classList.contains('ng-touched')) {
              this.hasError.next(true);
          }
      });
    });
    this._classChangeObserver.observe(this._elementRef.nativeElement, {
      attributes: true, childList: true, characterData: true
    });

    this.ngControl.statusChanges.pipe(
        startWith(''),
        map(state => state === 'INVALID'),
        takeUntil(this._onDestroy)
    ).subscribe(this.hasError);
    this.ngControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(this.valueChange);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this._classChangeObserver.disconnect();
  }

  focus(): void {
    this._elementRef.nativeElement.focus();
  }

}
