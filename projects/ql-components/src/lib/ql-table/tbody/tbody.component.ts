import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ql-tbody',
  templateUrl: './tbody.component.html',
  styleUrls: ['./tbody.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TbodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
