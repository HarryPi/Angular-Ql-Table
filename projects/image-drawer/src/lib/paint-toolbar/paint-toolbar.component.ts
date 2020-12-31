import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { QColorModel } from '../shared/models/qcolor.model';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import { Toolbar } from './toolbar';

@Component({
  selector: 'ql-paint-toolbar',
  templateUrl: './paint-toolbar.component.html',
  styleUrls: ['./paint-toolbar.component.scss'],
  providers: [
    { provide: Toolbar, useExisting: PaintToolbarComponent }
  ]
})
export class PaintToolbarComponent extends Toolbar implements OnInit, OnChanges, OnDestroy {

  @Input()
  colors: string[] | QColorModel[];

  @Output()
  colorsChange: Subject<string[] | QColorModel[]>;

  @Output()
  selectedColor: Subject<string>;

  @Output()
  requestUndo: Subject<void>;

  colorForm: FormGroup;

  private _destroy: Subject<void>;

  constructor(
      private _changeDetection: ChangeDetectorRef,
      private _fb: FormBuilder,
      private _renderer: Renderer2,
      private _dialog: MatDialog,
      @Inject(DOCUMENT) private _document: HTMLDocument
  ) {
    super();
    this.colorsChange = new Subject<string[] | QColorModel[]>();
    this.selectedColor = new Subject<string>();
    this.requestUndo = new Subject<void>();
    this._destroy = new Subject<void>();
  }

  ngOnInit(): void {
    // @ts-ignore
    const colorControls: FormControl[] = this.colors?.map(c => new FormControl(c)) ?? [];
    this.colorForm = this._fb.group({
      colors: this._fb.array(colorControls)
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  addColor(): void {
    const selectedControl: FormControl[] = this.toolbarColors.controls.filter(c => (c.value as QColorModel).isSelected) as FormControl[];
    if (selectedControl?.length > 0) {
      selectedControl[0].value.isSelected = false;
    }
    this.toolbarColors.push(new FormControl({
      isSelected: true,
      color: 'black',
      label: ''
    } as QColorModel));

  }

  getColorValue(color: AbstractControl): string {
    const value: string | QColorModel = color.value;
    if (typeof value === 'string') {
      if (this._isColor(value)) {
        return value;
      }
    }
    if (this._isColor((value as QColorModel).color)) {
      return (value as QColorModel).color;
    }

    return 'black';
  }

  activateColor(color: string, index: number, elToMarkAsSelected: HTMLSpanElement): void {
    const activeColor: AbstractControl[] = this.toolbarColors.controls.filter(c => c.value.isSelected);

    if (activeColor?.length > 0) {
      activeColor[0].value.isSelected = false;
    }

    const options = this.toolbarColors.controls.map(c => c.value);
    options[index].isSelected = true;

    const selectedEl: Element = this._document.querySelector('.selected');
    if (selectedEl) {
      this._renderer.removeClass(selectedEl, 'selected');
    }
    this._renderer.addClass(elToMarkAsSelected, 'selected');
    this.selectedColor.next(color);
    this.toolbarColors.setValue([...options]);
  }

  undo(): void {
    this.requestUndo.next();
  }

  editLabel(i: number): void {
    const dialogRef = this._dialog.open(ColorSettingsComponent, {
      height: '35%',
      width: '30%',
      data: {
        index: i
      }
    });

    dialogRef.afterClosed().pipe(
        first(),
        tap(({ label, index }) => {
          this.toolbarColors.controls[index].setValue({
            ...this.toolbarColors.controls[index].value,
            label
          });
        })
    ).subscribe();

  }

  getColors(): QColorModel[] {
    return this.toolbarColors.controls.map(c => c.value) as QColorModel[];
  }

  exportColors(): void {
    this.colorsChange.next(this.getColors());
  }

  colorValueChanged(event: Event, i: number): void {
    const controlToUpdate = this.toolbarColors.controls[i];
    controlToUpdate.setValue({
      ...controlToUpdate.value,
      color: (event.target as HTMLInputElement).value
    } as QColorModel);
  }

  private _mapStringToColor(strColor: string): QColorModel {
    if (typeof strColor === 'string') {
      return {
        color: strColor,
        label: ''
      } as QColorModel;
    } else {
      return strColor;
    }
  }

  private _isColor(strColor: string): boolean {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
  }

  get toolbarColors(): FormArray {
    return this.colorForm.get('colors') as FormArray;
  }


}
