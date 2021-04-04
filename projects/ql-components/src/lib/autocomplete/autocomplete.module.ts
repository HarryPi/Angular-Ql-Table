import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDirective } from './autocomplete.directive';
import { AutocompleteComponent } from './autocomplete.component';



@NgModule({
  declarations: [AutocompleteDirective, AutocompleteComponent],
  imports: [
    CommonModule
  ]
})
export class AutocompleteModule { }
