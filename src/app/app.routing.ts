import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SigninComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'create', component: CreateComponent },
  { path: 'main', component: MainComponent }
];

export const routing = RouterModule.forRoot(routes);
