import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogAnalyticService } from '@app/device/loganalytic.service';
import { ActorStateHistory, ActorStateChange } from '@app/device/actorstatehistory.model';
import { CalendarEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { MatDialog } from '@angular/material';
import { ActorstatedaydialogComponent } from '@app/device/actorstate/actorstatedaydialog/actorstatedaydialog.component';

@Component({
  selector: 'app-actorstateoverview',
  templateUrl: './actorstateoverview.component.html',
  styleUrls: ['./actorstateoverview.component.scss']
})
export class ActorstateoverviewComponent implements OnInit {
  public isLoading: boolean;
  public actorStateHistory: ActorStateHistory[];
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];
  public view = 'month';

  constructor(private router: Router, private logService: LogAnalyticService, public dayActorStateDialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  public refresh(): void {
    this.getActorStateHistory();
  }

  public onDayClicked(day: any): void {
      const dialogRef = this.dayActorStateDialog.open(ActorstatedaydialogComponent, {
        width: '98%',
        data: day
      });
  }

  public onEventClicked(a: string, event: any): void {
    const dialogRef = this.dayActorStateDialog.open(ActorstatedaydialogComponent, {
      width: '98%',
      data: {events: [event]}
    });
  }

  private getActorStateHistory(): void {
    this.isLoading = true;
    this.logService.getActorStateStatistic().subscribe((statistic: ActorStateHistory[]) => {
      this.actorStateHistory = statistic;

      statistic.forEach((ash: ActorStateHistory) => {
        ash.actorStateChanges.reverse().forEach((atc: ActorStateChange) => {
          if (atc.duration) {
            this.events.push({
              title: '(' + Math.round(atc.duration) + ' m) ' + ash.actorName,
              start: new Date(atc.timestamp - (atc.duration * 60000)),
              end: new Date(atc.timestamp),
              meta: {ash, atc}
            });
          }
        });
      });

      this.isLoading = false;
    }, (error: any) => {
      this.isLoading = false;
    });
  }
}
