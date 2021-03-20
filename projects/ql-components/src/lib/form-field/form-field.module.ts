import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { FieldComponent } from './field/field.component';
import { InputDirective } from './input.directive';
import { LabelComponent } from './label/label.component';
import { IconDirective } from './icon.directive';

@NgModule({
    declarations: [
        FieldComponent,
        InputDirective,
        ErrorComponent,
        LabelComponent,
        IconDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FieldComponent,
        InputDirective,
        ErrorComponent,
        LabelComponent,
        IconDirective
    ]
})
export class FormFieldModule {
}
