import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';

import { AuthenticationService } from '../authentication/authentication.service';
import { I18nService } from '../i18n.service';
import { IothubService } from '@app/core/iothub.service';
import { Device } from '../device.model';
import { MatSelectChange, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  public isLoading: boolean;
  public devices: Device[];
  public selectedDevice: Device;

  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(private router: Router,
              private titleService: Title,
              private media: ObservableMedia,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private iothubService: IothubService) {}

  ngOnInit() {
    this.isLoading = true;
    this.iothubService.getDevices().subscribe((devices: Device[]) => {
      this.isLoading = false;
      this.devices = devices;
    }, (error: any) => {
      this.isLoading = false;
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  public onDeviceSelected(event: MatSelectChange): void {
    this.router.navigateByUrl('/about', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/devices', this.selectedDevice.deviceId])
    );
  }

  public onMainClick(event: any): void {
    if (this.isMobile) {
      this.sidenav.close();
    }
    this.router.navigate(['/devices', this.selectedDevice.deviceId]);
  }

  public onActorhistoryClick(event: any): void {
    if (this.isMobile) {
      this.sidenav.close();
    }
    this.router.navigate(['/devices', this.selectedDevice.deviceId, 'actorstates']);
  }

  public onLogsClick(event: any): void {
    if (this.isMobile) {
      this.sidenav.close();
    }
    this.router.navigate(['/devices', this.selectedDevice.deviceId, 'logs']);
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
