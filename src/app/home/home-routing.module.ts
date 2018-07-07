import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { HomeComponent } from './home.component';
import { DeviceComponent } from '@app/device/item/device.component';
import { ActorstateoverviewComponent } from '@app/device/actorstate/actorstateoverview/actorstateoverview.component';
import { LogsdialogComponent } from '@app/device/logs/logsdialog/logsdialog.component';

const routes: Routes = [
  Route.withShell([
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'devices/:deviceId', component: DeviceComponent, data: { title: extract('Device') } },
    { path: 'devices/:deviceId/actorstates', component: ActorstateoverviewComponent,
      data: { title: extract('Actorhistory') } },
    { path: 'devices/:deviceId/logs', component: LogsdialogComponent, data: { title: extract('Logs') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
