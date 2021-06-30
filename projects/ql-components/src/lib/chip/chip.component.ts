import { Component, OnInit } from '@angular/core';
import { QlBaseStyle } from '../common/ql-base-style';

export abstract class ChipToken {

}

@Component({
  selector: 'ql-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  providers: [
    { provide: ChipToken, useExisting: ChipComponent }
  ]
})
export class ChipComponent extends QlBaseStyle implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}


