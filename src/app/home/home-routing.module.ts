import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { HomeComponent } from './home.component';
import { DeviceComponent } from '@app/device/item/device.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/devices', pathMatch: 'full' },
    { path: 'devices', component: HomeComponent, data: { title: extract('Devices') } },
    { path: 'device/:deviceId', component: DeviceComponent }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
