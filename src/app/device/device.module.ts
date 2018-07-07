import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@app/shared';
import { DeviceComponent } from './item/device.component';
import { WeatherService } from './weather.service';
import { LogAnalyticService } from './loganalytic.service';
import { LogsdialogComponent } from './logs/logsdialog/logsdialog.component';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActorstateoverviewComponent } from './actorstate/actorstateoverview/actorstateoverview.component';
import { ActorstatedaydialogComponent } from './actorstate/actorstatedaydialog/actorstatedaydialog.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    HttpModule,
    SharedModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    DeviceComponent,
    LogsdialogComponent,
    ActorstateoverviewComponent,
    ActorstatedaydialogComponent
  ],
  exports: [
    DeviceComponent
  ],
  entryComponents: [LogsdialogComponent, ActorstatedaydialogComponent],
  providers: [
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
