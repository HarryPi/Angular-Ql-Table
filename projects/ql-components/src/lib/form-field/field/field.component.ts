import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, ContentChild, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Destroyable } from '../../common/destroyable';
import { InputToken } from '../input';

@Component({
  selector: 'ql-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  animations: [
    trigger('invalid', [
      state('no-error', style({
        width: 0,
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('error', style({
        width: '100%',
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('no-error <=> error', [
        animate(350)
      ]),
      transition('void <=> error', [
        animate(350, keyframes([
          style({ opacity: 0, width: '33%', transform: 'translateY(-66%)' }),
          style({ opacity: .6, width: '66%', transform: 'translateY(-33%)' }),
          style({ opacity: 1, width: '100%', transform: 'translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class FieldComponent extends Destroyable implements OnInit, AfterContentInit {

  @ViewChild('inputDiv', {static: true}) inputDiv: ElementRef<HTMLDivElement>;

  @ContentChild(InputToken) input!: InputToken;

  @HostBinding('class.invalid')
  inputError: boolean;

  constructor(
      private _renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.input.hasError.pipe(
        takeUntil(this._onDestroy)
    ).subscribe(invalid => {
      this.inputError = invalid;
    });

    console.log(this.inputDiv);
    if (this.input && this.input.height) {
      this._renderer.setStyle(this.inputDiv.nativeElement, 'height', this.input.height);
    }
  }

  focusInput = (): void => this.input.focus();
}
