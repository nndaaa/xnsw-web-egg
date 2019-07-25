import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './pages/device/device.component';
import { UserComponent } from './pages/user/user.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent,
    children: [
    {
      path: 'device',
      component: DeviceComponent
    },
    {
      path: 'user',
      component: UserComponent
    }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
