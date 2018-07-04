import { Component, OnInit, Inject } from '@angular/core';
import { IothubService } from './iothub.service';
import { Device } from './device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public isLoading: boolean;
  public devices: Device[];

  constructor(private iothubService: IothubService) { }

  ngOnInit() {
    this.isLoading = true;
    this.iothubService.getDevices().subscribe((devices: Device[]) => {
      this.isLoading = false;
      this.devices = devices;
    }, (error: any) => {
      this.isLoading = false;
    });
  }

}
