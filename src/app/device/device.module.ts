import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IothubService } from './iothub.service';
import { DevicesComponent } from './list/devices.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@app/shared';
import { DeviceComponent } from './item/device.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    DevicesComponent,
    DeviceComponent
  ],
  exports: [
    DevicesComponent,
    DeviceComponent
  ],
  providers: [
    {
      provide: IothubService,
      useClass: IothubService
    }
  ]
})
export class DeviceModule { }
