import { Component, OnInit } from '@angular/core';
import { AutocompleteToken } from './autocomplete';

@Component({
  selector: 'ql-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    { provide: AutocompleteToken, useExisting: AutocompleteComponent }
  ]
})
export class AutocompleteComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
