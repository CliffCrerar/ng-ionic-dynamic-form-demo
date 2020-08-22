import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResponseObject} from '../models';
import {filter} from 'rxjs/operators';
import {LoadingController} from '@ionic/angular';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public subscription: Observable<any>;
    private httpHeaders: HttpHeaders;
    public httpSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
    public loader;
    private f1Emitted = false;
    private f2Emitted = false;
    private _formOne: ReplaySubject<any>;
    private _formTwo: ReplaySubject<any>;
    private protocolHttps: boolean;

    constructor(private http: HttpClient, private loadingController: LoadingController) {
        this.protocolHttps = (location as any).protocol === 'https:'
        this._formOne = new ReplaySubject<any>(1);
        this._formTwo = new ReplaySubject<any>(1);
        this.presentLoading();
        this.getFormData();
    }

    get formOne(){
        if(!this.f1Emitted){
            this.f1Emitted=true;
            this.formOneGet();
            return this._formOne;
        } else {
            return this._formOne;
        }
    }
    get formTwo(){
        if(!this.f2Emitted){
            this.f2Emitted=true;
            this.formTwoGet();
            return this._formTwo;
        } else {
            return this._formTwo;
        }

    }

    dataSubscription() {
        return this.httpSubject;
    }

    getFormData() {
        this.httpHeaders = new HttpHeaders()
            .append('Authorization', 'Basic cGZBZG1pbjphczQyZGEzZHNmNWxrYTEzNmRzM2ZhNGQ1MTJkc2Zha2xnaGl3ZXJuMjEzMQ==');
        // this.http.get(
        //     // 'https://pouchdb-server-docker-image-vqs2epe7sq-uc.a.run.app/dynamic-forms/_all_docs?include_docs=true&conflicts=true',
        //     '/api',
        //     {headers: this.httpHeaders}).subscribe((response: ResponseObject) => {
        //     const res: any = new ResponseObject(response).formData();
        //     console.log(response);
        //     this.httpSubject.next(res);
        // });
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

    formOneGet(){
        this.formOneHttp().subscribe(fData => this.formOne.next(fData));
    }

    formOneHttp(){
        if (this.protocolHttps) {
            return this.http.get('https://gist.githubusercontent.com/CliffCrerar/5f826ecac10738894872754813cf0764/raw/14a01ce8ef8ccd274f7168b15b3d0c8bb89eef89/form-one.json');
        } else {
            return this.http.get('http://gist.githubusercontent.com/CliffCrerar/5f826ecac10738894872754813cf0764/raw/14a01ce8ef8ccd274f7168b15b3d0c8bb89eef89/form-one.json');
        }
    }
    formTwoGet(){
        this.formTwoHttp().subscribe(fData => this.formTwo.next(fData));
    }

    formTwoHttp(){
        if (this.protocolHttps){
            return this.http.get('https://gist.githubusercontent.com/CliffCrerar/5f826ecac10738894872754813cf0764/raw/14a01ce8ef8ccd274f7168b15b3d0c8bb89eef89/form-two.json');
        } else {
            return this.http.get('http://gist.githubusercontent.com/CliffCrerar/5f826ecac10738894872754813cf0764/raw/14a01ce8ef8ccd274f7168b15b3d0c8bb89eef89/form-two.json');
        }
    }

}
