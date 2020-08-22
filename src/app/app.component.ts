import {Component, EventEmitter, HostListener, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpService} from './dynamic-form/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {log} from 'util';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

    public dto: any;
    public path: string;
    public displaySide: boolean;
    public selectedIndex = 0;
    public codeEmitter = new EventEmitter<any>();
    public appPages = [
        {
            title: 'Experiment Description',
            url: '/folder/Experiment Description',
            icon: 'color-wand',
            sideDisplay: 'moreDetails'
        },
        {
            title: 'Personal Details Form',
            url: '/folder/Personal Details Form',
            icon: 'person-circle',
            sideDisplay: 'formOne'
        },
        {
            title: 'Food Order Form',
            url: '/folder/Food Order Form',
            icon: 'fast-food',
            form: 'formTwo'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.path = this.getPath();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
    }

    selectPage = () => this.appPages.filter(o => o.title === this.path)[0];

    selectIndex = (index?: number) => this.selectedIndex = index;

    getPath = () => window.location.pathname.replace(/%20/g, ' ').split('folder/')[1];

    onMenuClick(index: number): void {
        this.selectIndex(index);
        this.codeEmitter.emit(index);
    }
}
