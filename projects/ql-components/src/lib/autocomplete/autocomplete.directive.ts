import { Overlay } from '@angular/cdk/overlay';
import { Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, ViewContainerRef } from '@angular/core';
import { Destroyable } from '../common/destroyable';
import { InputToken } from '../form-field/input';
import { AutocompleteToken } from './autocomplete';

@Directive({
  selector: '[qlAutocomplete]'
})
export class AutocompleteDirective extends Destroyable implements OnInit, OnDestroy {

  @Input() autoComplete: AutocompleteToken;

  constructor(
      @Optional() @Host() private _qlInput: InputToken,
      private elementRef: ElementRef,
      private overlay: Overlay,
      private viewContainerRef: ViewContainerRef,
  ) {
    super();
  }

  ngOnInit(): void {
    if (!this._qlInput) {
      throw new Error('Autocomplete can only be applied on input fields with the QlInput directive');
    }
    if (!this.autoComplete) {
      throw new Error('You must provide an autocomplete component');
    }


  }

  ngOnDestroy(): void {
    super.cleanup();
  }

}
