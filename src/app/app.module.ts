import { MainComponent } from './pages/main/main.component';

import { UserModule } from './module/user/user.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { DeviceService } from './service/device.service';
import { FuncSeviceService } from './service/func-sevice.service';
import { HttpService } from './service/http.service';
import { DataSeviceService } from './service/data-sevice.service';

import {DeviceComponent} from './pages/device/device.component';
import { LoginComponent } from './pages/login/login.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    LoginComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    UserModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    DataSeviceService,
    FuncSeviceService,
    HttpService,
    DeviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
