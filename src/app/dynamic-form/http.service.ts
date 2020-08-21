import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseObject} from '../models';
import {filter} from 'rxjs/operators';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public subscription: Observable<any>;
    private httpHeaders: HttpHeaders;
    public httpSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
    public loader;

    constructor(private http: HttpClient, private loadingController: LoadingController) {
        this.presentLoading();
        this.runGetData();
    }

    dataSubscription() {
        return this.httpSubject;
    }

    runGetData() {
        this.httpHeaders = new HttpHeaders()
            .append('Authorization', 'Basic Zm9ybXMtZGI6ZWJLUWs1akVDcFNFNERaOXVwWG0=');
        this.http.get(
            'https://pouchdb-server-docker-image-vqs2epe7sq-uc.a.run.app/dynamic-forms/_all_docs?include_docs=true&conflicts=true',
            {headers: this.httpHeaders}).subscribe((response: ResponseObject) => {
            const res: any = new ResponseObject(response).formData();
            console.log(res);
            this.httpSubject.next(res);
        });
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }

}
