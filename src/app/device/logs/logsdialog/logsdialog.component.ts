import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Device } from '@app/device/device.model';
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
    public dialogRef: MatDialogRef<LogsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private logservice: LogAnalyticService) {
    this.device = data;
  }

  ngOnInit() {
    this.getLogs();
  }

  public OnCancel(): void {
    this.dialogRef.close();
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
