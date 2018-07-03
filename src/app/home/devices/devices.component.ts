import { Component, OnInit, Inject } from '@angular/core';
import { IothubService } from '@app/shared/device/iothub.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  public isLoading: boolean;
  // public devices: Device[];

  constructor(private iothubService: IothubService) { }

  ngOnInit() {
    this.isLoading = true;
    // this.iotHubService.get().then((devices: Device[]) => {
    //   this.devices = devices;
    //   this.isLoading = false;
    // }).catch((reason: string) => {
    //   this.isLoading = false;
    // });
  }

}
