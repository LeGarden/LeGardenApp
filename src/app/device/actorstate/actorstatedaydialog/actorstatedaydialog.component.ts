import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-actorstatedaydialog',
  templateUrl: './actorstatedaydialog.component.html',
  styleUrls: ['./actorstatedaydialog.component.scss']
})
export class ActorstatedaydialogComponent implements OnInit {
  public day: any;
  public events: any;

  constructor(public dialogRef: MatDialogRef<ActorstatedaydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.day = data;
      this.events = this.day.events;
     }

  ngOnInit() {
  }

  OnCancel(): void {
    this.dialogRef.close();
  }
}
