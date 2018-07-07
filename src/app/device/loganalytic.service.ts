import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalyticLog } from '@app/device/analyticlog.model';
import { ActorStateHistory, ActorStateChange } from '@app/device/actorstatehistory.model';

@Injectable()
export class LogAnalyticService {
    private baseUri = 'https://legardenapim.azure-api.net/logs';

    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
        this.httpClient.disableApiPrefix();
    }

    public getInfoLogs(): Observable<AnalyticLog> {
        return this.httpClient.get(this.baseUri + '/infos', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: AnalyticLog) => body)
        );
    }

    public getActorChanges(): Observable<AnalyticLog> {
        return this.httpClient.get(this.baseUri + '/actorstates', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: AnalyticLog) => body)
        );
    }

    public getActorStateStatistic(): Observable<ActorStateHistory[]> {
        return this.getActorChanges().pipe(map((log: AnalyticLog) => {
            const result: ActorStateHistory[] = [];

            // fill baseData aggregated on actor
            log.rows.forEach((row: string[]) => {
                const actorname = row[1];
                const ts = Date.parse(row[0]);
                const state = Number.parseInt(row[2]);

                if (!result.find(x => x.actorName === actorname)) {
                    result.push({
                        actorName: actorname,
                        actorStateChanges: []
                    });
                }
                const actorStateHistory = result.find(x => x.actorName === actorname);
                actorStateHistory.actorStateChanges.push({state: state, timestamp: ts});
            });

            // calculate statistikData
            result.forEach((ash: ActorStateHistory) => {
                for (let i = 0; i < ash.actorStateChanges.length; i++) {
                    const element: ActorStateChange = ash.actorStateChanges[i];
                    if (element.state === 0) {
                        const correspondingOn: ActorStateChange =
                            ash.actorStateChanges.slice(i + 1).find(x => x.state === 1);

                        if (correspondingOn) {
                            element.duration =
                            (ash.actorStateChanges[i].timestamp - correspondingOn.timestamp) / 60000;
                        }
                    }
                }
                const lastDurated = ash.actorStateChanges.find(x => x.duration > 0);
                if (lastDurated) {
                    ash.lastActorPeriod = lastDurated;
                }
            });

            return result;
        }));
    }
}
