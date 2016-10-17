import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NglModule } from 'ng-lightning/ng-lightning';
import { TextMaskModule } from 'angular2-text-mask';


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
import { AboutComponent } from './about/about.component';

import { ApiService, AppReadyEvent, ModalViewService, LocalStorageService } from './shared';
import { routing } from './app.routing';

import { TabComponent, TabsComponent, CrossIconComponent, TickIconComponent } from './ui-components';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    TextMaskModule,
    NglModule.forRoot({
      svgPath: '/icons'
    })
  ],
  declarations: [
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
    AddMoneyBankComponent,
    AboutComponent,
    // UI-components
    TabComponent,
    TabsComponent,
    CrossIconComponent,
    TickIconComponent
  ],
  providers: [
    ApiService,
    AppReadyEvent,
    ModalViewService,
    LocalStorageService
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
