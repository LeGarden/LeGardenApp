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
import { WeatherService } from './weather.service';
import { LogAnalyticService } from './loganalytic.service';
import { LogsdialogComponent } from './logs/logsdialog/logsdialog.component';

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
    DeviceComponent,
    LogsdialogComponent
  ],
  exports: [
    DevicesComponent,
    DeviceComponent
  ],
  entryComponents: [LogsdialogComponent],
  providers: [
    {
      provide: IothubService,
      useClass: IothubService
    },
    {
      provide: WeatherService,
      useClass: WeatherService
    },
    {
      provide: LogAnalyticService,
      useClass: LogAnalyticService
    }
  ]
})
export class DeviceModule { }
