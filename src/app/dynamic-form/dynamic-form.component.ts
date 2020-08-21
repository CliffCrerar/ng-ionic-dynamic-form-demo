import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from './http.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
    @Input() formId: any;
    showForm: boolean;
    public formData: any;
    now;
    deliveryDate;

    constructor(private http: HttpService) {
        console.log(this.formData);
        this.showForm = false;
        this.now = new Date();

    }

    ngOnInit() {
        this.deliveryDate = null;
        console.log(this.formData);
        this.http.dataSubscription().subscribe(data => {
            console.log(data);
            this.formData = data.filter((form: any) => form._id === this.formId)[0].formControls as any;
            console.log(this.formId);
            console.log(this.formData);
            this.showForm = true;
        });
    }

    onSelectChange(ev: MouseEvent) {
        console.log(ev);
    }

    getNowDate() {
        return new Date();
    }

    updateDateValue(picker) {
    }

}
