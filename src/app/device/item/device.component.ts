import { Component, OnInit } from '@angular/core';
import { Device } from '../../device/device.model';
import { ActivatedRoute } from '@angular/router';
import { IothubService } from '@app/device/iothub.service';
import { Actorstate } from '@app/device/actorstate.model';
import { MatSlideToggleChange, MatDialog } from '@angular/material';
import { WeatherService } from '@app/device/weather.service';
import { BasicWeather } from '@app/device/basicweather.model';
import { IrrigationRecommendation } from '@app/irregationrecommendation.model';
import { LogsdialogComponent } from '@app/device/logs/logsdialog/logsdialog.component';
import { LogAnalyticService } from '@app/device/loganalytic.service';
import { ActorStateHistory } from '@app/device/actorstatehistory.model';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  public isLoading: boolean;
  public device: Device;
  public actorstates: Actorstate[];
  public weather: BasicWeather;
  public irrigationRecommendation: IrrigationRecommendation;

  constructor(
    private route: ActivatedRoute,
    private iothubService: IothubService,
    private weatherService: WeatherService,
    public logsDialog: MatDialog,
    private logService: LogAnalyticService) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh(): void {
    this.getDevice();
    this.getWeather();
  }

  public changeActorState(event: MatSlideToggleChange, actorstate: Actorstate) {
    actorstate.isLoading = true;
    if (event.checked === true) {
      this.iothubService.putActorOn(this.device.deviceId, actorstate.id).subscribe((as: Actorstate) => {
        event.source.checked = as.state === 1 ? true : false;
      }, (error: any) => {
        event.source.checked = false;
        actorstate.isLoading = false;
      }, () => {
        actorstate.isLoading = false;
      });
    } else {
      this.iothubService.putActorOff(this.device.deviceId, actorstate.id).subscribe((as: Actorstate) => {
        event.source.checked = as.state === 0 ? false : true;
      }, (error: any) => {
        event.source.checked = true;
        actorstate.isLoading = false;
      }, () => {
        actorstate.isLoading = false;
      });
    }
  }

  public openLogs() {
    const dialogRef = this.logsDialog.open(LogsdialogComponent, {
      width: '98%',
      height: '95%',
      data: this.device
    });
  }

  private getDevice(): void {
    const deviceId = this.route.snapshot.paramMap.get('deviceId');
    this.isLoading = true;
    this.iothubService.getDevice(deviceId).subscribe((device: Device) => {
      this.isLoading = false;
      this.device = device;
      if (this.device.connectionState === 'Connected') {
        this.getActorStates(this.device.deviceId);
      }
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  private getWeather(): void {
    this.weatherService.getBasicWeather().subscribe((weather: BasicWeather) => {
      this.weather = weather;
      this.getIrrigationRecommendation(this.weather.sumOfRain, this.weather.avarageTemperature);
    }, (error: any) => {
    });
  }

  private getIrrigationRecommendation(mm: number, celsius: number): void {
    this.weatherService.getIrrigationRecommendation(mm, celsius).subscribe((r: IrrigationRecommendation) => {
      this.irrigationRecommendation = r;
    }, (error: any) => {
    });
  }

  private getActorStates(deviceId: string): void {
    if (this.actorstates) {
      this.actorstates.forEach((as: Actorstate) => {
        as.isLoading = true;
      });
    }
    this.iothubService.getDeviceActorstates(deviceId).subscribe((actorstates: Actorstate[]) => {
      this.actorstates = actorstates;
      this.getActorStateStatistic();
    }, (error: any) => {
    });
  }

  private getActorStateStatistic(): void {
    this.logService.getActorStateStatistic().subscribe((statistic: ActorStateHistory[]) => {
      this.actorstates.forEach((as: Actorstate) => {
        const actorStatistic = statistic.find(x => x.actorName === as.name);
        if (actorStatistic) {
          as.actorStateHistory = actorStatistic;
        }
      });
    }, (error: any) => {
    });
  }

}
