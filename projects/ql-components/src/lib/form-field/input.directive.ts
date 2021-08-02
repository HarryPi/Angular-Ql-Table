import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
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
    this.hasError.next(this.ngControl?.touched && this.ngControl?.invalid);
  }

  ngAfterContentInit(): void {

    // todo: This causes matautocomplete to present error twice
    this.ngControl?.statusChanges.pipe(
        startWith(''),
        debounceTime(100),
        map(state => state === 'INVALID'),
        takeUntil(this._onDestroy)
    ).subscribe(this.hasError);


    this.valueChange = this.ngControl?.valueChanges;
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  focus(): void {
    this._elementRef.nativeElement.focus();
  }


}
