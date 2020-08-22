import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import * as prettyFormat from 'pretty-format';
import {Subscription} from 'rxjs';
import {HttpService} from '../dynamic-form/http.service';

@Component({
    selector: 'app-code-display',
    templateUrl: './code-display.component.html',
    styleUrls: ['./code-display.component.css']
})
export class CodeDisplayComponent implements OnInit, OnDestroy {
    @Input() codeEmitter: EventEmitter<number>;

    displayIndex: number;
    formOne: any;
    formTwo: any;

    constructor(private http: HttpService) {
        this.displayIndex = 0;
    }

    ngOnInit(): void {
        this.http.formOne.subscribe(f=>{
            console.log(f)
            this.formOne = this.displayFormat(f);
        });
        this.http.formTwo.subscribe(f => {
            console.log(f)
            this.formTwo = this.displayFormat(f);
        });

        this.codeEmitter.subscribe((code: number) => this.changeCode(code));
    }

    ngOnDestroy() {
        this.codeEmitter.unsubscribe();
    }

    displayFormat = (o: object) => prettyFormat(o).replace(/Object/g, '');

    changeCode = (code: number) => this.displayIndex =  code
}
