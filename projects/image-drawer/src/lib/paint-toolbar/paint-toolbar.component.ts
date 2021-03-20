import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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

  /**
   * Requests from the main component to fire off a complete state request
   */
  requestExportState: Subject<QColorModel[]>;

  colorForm: FormGroup;

  private _destroy: Subject<void>;

  constructor(
      private _changeDetection: ChangeDetectorRef,
      private _fb: FormBuilder,
      private _dialog: MatDialog
  ) {
    super();
    this.colorsChange = new Subject<string[] | QColorModel[]>();
    this.selectedColor = new Subject<string>();
    this.requestUndo = new Subject<void>();
    this._destroy = new Subject<void>();
    this.requestExportState = new Subject<QColorModel[]>();
  }

  ngOnInit(): void {
    // @ts-ignore
    const colorControls: FormControl[] = this.colors?.map(c => new FormControl(c)) ?? [
      this._fb.control({
        color: 'black',
        isSelected: true,
        label: 'default'
      } as QColorModel)
    ];
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
    this.toolbarColors.push(new FormControl({
      // We only want to mark as selected if there are no other colors
      isSelected: this.toolbarColors.controls.length <= 0,
      color: 'black',
      label: ''
    } as QColorModel));

    this._emitColorFormsChanged();
  }

  /**
   * Get the value of input color as string, the string can be in any form 'black' '#ef54hb', 'rgb(0,0,0)'
   * @param {AbstractControl} color
   * @returns {string}
   */
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

  /**
   * Marks a color as selected in the HTML and updates the internal FormArray
   * @param {string} color
   * @param {number} index
   */
  activateColor(color: string, index: number): void {
    const activeColor: AbstractControl[] = this.toolbarColors.controls.filter(c => c.value.isSelected);

    if (activeColor?.length > 0) {
      activeColor[0].value.isSelected = false;
    }

    const options = this.toolbarColors.controls.map(c => c.value);
    options[index].isSelected = true;

    this.selectedColor.next(color);
    this.toolbarColors.setValue([...options]);
  }

  /**
   * Informs any component that holds the points drawn to the image to undo the last action
   */
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
    return this.toolbarColors?.controls.map(c => c.value) as QColorModel[];
  }


  colorValueChanged(event: Event, i: number): void {
    const controlToUpdate = this.toolbarColors.controls[i];
    controlToUpdate.setValue({
      ...controlToUpdate.value,
      color: (event.target as HTMLInputElement).value
    } as QColorModel);

    this._emitColorFormsChanged();
  }

  exportState(): void {
    this.requestExportState.next(this.getColors());
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

  /**
   * Check if its a colo
   * @param {string} strColor
   * @returns {boolean}
   * @private
   */
  private _isColor(strColor: string): boolean {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
  }

  private _emitColorFormsChanged(): void {
    this.colorsChange.next(this.getColors());
  }

  get toolbarColors(): FormArray {
    return this.colorForm?.get('colors') as FormArray;
  }


}
