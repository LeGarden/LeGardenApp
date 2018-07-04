import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../../device/device.model';
import { ActivatedRoute } from '@angular/router';
import { IothubService } from '@app/device/iothub.service';
import { Actorstate } from '@app/device/actorstate.model';

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
