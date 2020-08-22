import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import * as process from 'process';
import {Observable, Subscription} from 'rxjs';
import {CustomForm, FormBuilderFactory, FormControl, FormInputBoxControl, ResponseObject, SingleSelectFormControl} from '../models';

import {FormOneModel} from './form-models/form-one.model';
import {FormTwoModel} from './form-models/form-two.model';
import {IonInfiniteScroll} from '@ionic/angular';
import {log} from 'util';


@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;
    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
    public formOne: FormOneModel;
    public formTwo: FormTwoModel;
    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit() {
        this.infiniteScroll.ionInfinite.subscribe(event => {
                console.log(event);
                this.infiniteScroll.disabled = true;
            }
        );
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.infiniteScroll);
    }


}
