import { Component, OnInit, Inject } from '@angular/core';
import { IothubService } from '../iothub.service';
import { Device } from '../device.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public isLoading: boolean;
  public devices: Device[];

  constructor(private iothubService: IothubService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.iothubService.getDevices().subscribe((devices: Device[]) => {
      this.isLoading = false;
      this.devices = devices;
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  public openDevice(event: any, device: Device) {
    this.router.navigate(['/device', device.deviceId]);
  }

}
