import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FolderPageRoutingModule} from './folder-routing.module';

import {FolderPage} from './folder.page';
import {FormOneComponent} from './form-one/form-one.component';
import {FormTwoComponent} from './form-two/form-two.component';
import {HttpClientModule} from '@angular/common/http';
import {DynamicFormComponent} from '../dynamic-form/dynamic-form.component';
import {TemplateLoggerPipe} from '../template-loggere.pipe';
import {HttpService} from '../dynamic-form/http.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        HttpClientModule
    ],
    providers: [HttpService],
    declarations: [FolderPage, FormOneComponent, FormTwoComponent, DynamicFormComponent, TemplateLoggerPipe]
})
export class FolderPageModule {
}
