import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorStateHistory, ActorStateChange } from '@app/core/actorstatehistory.model';
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
import { IothubService } from '@app/core/iothub.service';
import {Duration, add, subtract} from 'date-tools';

@Component({
  selector: 'app-actorstateoverview',
  templateUrl: './actorstateoverview.component.html',
  styleUrls: ['./actorstateoverview.component.scss']
})
export class ActorstateoverviewComponent implements OnInit, OnChanges {
  public isLoading: boolean;
  public actorStateHistory: ActorStateHistory[];
  public viewDate: Date = new Date();
  public events: CalendarEvent[] = [];
  public view = 'month';

  constructor(
    private route: ActivatedRoute,
    private iothubService: IothubService,
    public dayActorStateDialog: MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges) {}

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
    const deviceId = this.route.snapshot.paramMap.get('deviceId');
    this.isLoading = true;
    this.iothubService.getActorStateHistory(deviceId,
      new Date(this.viewDate.setDate(1)), add(new Date(this.viewDate.setDate(1)), Duration.Months(1)))
      .subscribe((statistic: ActorStateHistory[]) => {
      this.events = [];
      this.actorStateHistory = statistic;

      statistic.forEach((ash: ActorStateHistory) => {
        ash.actorStateChanges.reverse().forEach((atc: ActorStateChange) => {
          if (atc.duration) {
            this.events.push({
              title: '(' + Math.round(atc.duration) + ' m) ' + ash.actorId,
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
