import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IothubService } from './iothub.service';
import { DevicesComponent } from './devices.component';
import { MaterialModule } from '@app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@app/shared';

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
    DevicesComponent
  ],
  providers: [
    {
      provide: IothubService,
      useClass: IothubService
    }
  ]
})
export class DeviceModule { }
