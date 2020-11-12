import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ql-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  

  private _color: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  get color(): string {
    return this._color;
  }

  @Input() set color(value: string) {
    this._color = value;
  }

}
