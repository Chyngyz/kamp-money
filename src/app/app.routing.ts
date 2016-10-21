import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { AddMoneyMainComponent } from './add-money-main/add-money-main.component';
import { AddMoneyBankComponent } from './add-money-bank/add-money-bank.component';
import { AboutComponent } from './about/about.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransferConfirmComponent } from './transfer-confirm/transfer-confirm.component';
import { TransactionsHistoryComponent } from './t-history/t-history.component';

const routes: Routes = [
  // { path: 'signin', component: SigninComponent },
  { path: 'create', component: CreateComponent },
  { path: 'main', component: MainComponent },
  { path: 'payment-form', component: PaymentFormComponent },
  { path: 'payment-confirm', component: PaymentConfirmComponent },
  { path: 'settings-main', component: SettingsMainComponent },
  { path: 'settings-edit', component: SettingsEditComponent },
  { path: 'add-money', component: AddMoneyMainComponent },
  { path: 'add-money-bank', component: AddMoneyBankComponent},
  { path: 'about', component: AboutComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transfer-confirm', component: TransferConfirmComponent },
  { path: 'transactions-history', component: TransactionsHistoryComponent },
  { path: '', component: HomeComponent }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
