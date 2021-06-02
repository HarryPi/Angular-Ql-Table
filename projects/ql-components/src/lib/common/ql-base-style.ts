import { Directive, HostBinding, Input } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class QlBaseStyle {
  @Input()
  @HostBinding('style.--width')
  width: string;

  @Input()
  @HostBinding('style.--height')
  height: string;

  @Input() color: 'primary' | 'ascent' | 'simple' | 'warn';

}
