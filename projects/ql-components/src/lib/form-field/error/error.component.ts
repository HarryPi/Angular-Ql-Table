import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ErrorToken } from './error';

@Component({
    selector: 'ql-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    providers: [
        { provide: ErrorToken, useExisting: ErrorComponent }
    ]
})
export class ErrorComponent extends ErrorToken implements OnInit, AfterContentInit {

    constructor(
    ) {
        super();
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
    }

}
