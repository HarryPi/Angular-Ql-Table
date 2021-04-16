import { Component, OnInit } from '@angular/core';

export abstract class ToolbarToken {

}

@Component({
  selector: 'ql-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [
    { provide: ToolbarToken, useExisting: QlToolbarComponent }
  ]
})
export class QlToolbarComponent extends ToolbarToken implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
