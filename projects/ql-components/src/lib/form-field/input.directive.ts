import { AfterContentInit, Directive, ElementRef, HostListener, OnDestroy, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map, startWith, takeUntil } from 'rxjs/operators';
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
    }

    focus(): void {
        this._elementRef.nativeElement.focus();
    }

}
