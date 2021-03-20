import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputDirective } from './input.directive';

describe('InputDirective', () => {
    it('should create an instance', async () => {
        const elementRefSpy = jasmine.createSpyObj<ElementRef>(['nativeElement']);
        const ngControl = jasmine.createSpyObj<NgControl>(['valueChanges']);

        const directive = new InputDirective(elementRefSpy, ngControl);
        await expect(directive).toBeTruthy();
    });
});
