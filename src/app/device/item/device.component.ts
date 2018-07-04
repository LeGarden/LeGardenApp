import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../device/device.model';
import { ActivatedRoute } from '@angular/router';
import { IothubService } from '@app/device/iothub.service';
import { Actorstate } from '@app/device/actorstate.model';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  public isLoading: boolean;
  public device: Device;
  public actorstates: Actorstate[];

  constructor(private route: ActivatedRoute, private iothubService: IothubService) { }

  ngOnInit() {
    this.getDevice();
  }

  public refresh(): void {
    this.getDevice();
  }

  public changeActorState(event: MatSlideToggleChange, actorstate: Actorstate) {
    actorstate.isLoading = true;
    if (event.checked === true) {
      this.iothubService.putActorOn(this.device.deviceId, actorstate.id).subscribe((as: Actorstate) => {
        event.source.checked = as.state === 1 ? true : false;
      }, (error: any) => {
        event.source.checked = false;
      }, () => {
        actorstate.isLoading = false;
      });
    } else {
      this.iothubService.putActorOff(this.device.deviceId, actorstate.id).subscribe((as: Actorstate) => {
        event.source.checked = as.state === 0 ? false : true;
      }, (error: any) => {
        event.source.checked = true;
      }, () => {
        actorstate.isLoading = false;
      });
    }
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

  private getActorStates(deviceId: string): void {
    this.iothubService.getDeviceActorstates(deviceId).subscribe((actorstates: Actorstate[]) => {
      this.actorstates = actorstates;
    }, (error: any) => {
    });
  }

}
