import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ql-color-settings',
  templateUrl: './color-settings.component.html',
  styleUrls: ['./color-settings.component.scss']
})
export class ColorSettingsComponent implements OnInit {

  labelControl: FormControl;

  constructor(
      public dialogRef: MatDialogRef<ColorSettingsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { index: number }
  ) {
  }

  ngOnInit(): void {
    this.labelControl = new FormControl('');
  }

  save(): void {
    this.dialogRef.close({
      label: this.labelControl.value,
      index: this.data.index
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
