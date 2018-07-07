import { Component, OnInit, Inject } from '@angular/core';
import { Device } from '@app/core/device.model';
import { LogAnalyticService } from '@app/device/loganalytic.service';
import { AnalyticLog } from '@app/device/analyticlog.model';

@Component({
  selector: 'app-logsdialog',
  templateUrl: './logsdialog.component.html',
  styleUrls: ['./logsdialog.component.scss']
})
export class LogsdialogComponent implements OnInit {
  public device: Device;
  public isLoading: boolean;
  public analyticLog: AnalyticLog;
  // public messageFilter: any = { message: '' };

  constructor(
    private logservice: LogAnalyticService) {
  }

  ngOnInit() {
    this.getLogs();
  }

  private getLogs(): void {
    this.isLoading = true;
    this.logservice.getInfoLogs().subscribe((logs: AnalyticLog) => {
      this.analyticLog = logs;
      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
    });
  }

}
