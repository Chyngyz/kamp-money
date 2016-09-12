import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import MaskedInput from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';
import { MainComponent } from './main/main.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { AddMoneyMainComponent } from './add-money-main/add-money-main.component';
import { AddMoneyBankComponent } from './add-money-bank/add-money-bank.component';

import { ApiService } from './shared';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    MaskedInput,
    AppComponent,
    HomeComponent,
    SigninComponent,
    CreateComponent,
    MainComponent,
    PaymentFormComponent,
    PaymentConfirmComponent,
    SettingsEditComponent,
    SettingsMainComponent,
    AddMoneyMainComponent,
    AddMoneyBankComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
