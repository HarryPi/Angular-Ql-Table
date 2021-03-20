import { AfterContentInit, Directive, ElementRef, Self } from '@angular/core';

export abstract class IconToken {
}

@Directive({
    selector: '[qlIcon]',
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: {
        class: 'icon'
    },
    providers: [{provide: IconToken, useExisting: IconDirective}]
})
export class IconDirective extends IconToken implements AfterContentInit {

    constructor(
        @Self() private _elementRef: ElementRef<unknown>
    ) {
        super();
    }

    ngAfterContentInit(): void {
    }

}
