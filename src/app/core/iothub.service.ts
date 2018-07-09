import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Device } from './device.model';
import { Actorstate } from '@app/device/actorstate.model';
import { ActorStateHistory, ActorStateChange } from './actorstatehistory.model';
import { CloudEvent } from '@app/core/cloudevent';

@Injectable()
export class IothubService {
    private baseUri = 'https://legardenapim.azure-api.net';
    private cachedActorStates: Actorstate[] = [];

    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
        this.httpClient.disableApiPrefix();
    }

    public getDevices(): Observable<Device[]> {
        return this.httpClient.get(this.baseUri + '/devices', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: Device[]) => body)
        );
    }

    public getDevice(deviceId: string): Observable<Device> {
        return this.httpClient.get(this.baseUri + '/devices/' + deviceId, { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: Device) => body)
        );
    }

    public getDeviceActorstates(deviceId: string): Observable<Actorstate[]> {
        return this.httpClient.get(this.baseUri + '/devices/' + deviceId + '/actors/states', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: Actorstate[]) => {
                this.cachedActorStates = body;
                return body;
            })
        );
    }

    public getActorStateHistory(deviceId: string, from: Date, to: Date): Observable<ActorStateHistory[]> {
        return this.httpClient.get(this.baseUri + '/devices/' + deviceId + '/actors/statechanges?from='
            + from.toISOString() + '&to=' + to.toISOString(), { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: CloudEvent[]) => {
                const result: ActorStateHistory[] = [];

                // fill baseData aggregated on actor
                body.forEach((ce: CloudEvent) => {
                    if (ce.subject === 'Actor' && (ce.eventType === 'On' || ce.eventType === 'Off')) {
                        if (!result.find(x => x.actorId === ce.subjectId)) {
                            let actorname = ce.subjectId;
                            const actorstate = this.cachedActorStates.find(x => x.id === ce.subjectId);
                            if (actorstate) {
                                actorname = actorstate.name;
                            }

                            result.push({
                                actorName: actorname,
                                actorId: ce.subjectId,
                                actorStateChanges: []
                            });
                        }
                        const actorStateHistory = result.find(x => x.actorId === ce.subjectId);
                        actorStateHistory.actorStateChanges.push({state: ce.eventType,
                            timestamp: Date.parse(ce.eventOccurrence)});
                    }
                });

                // calculate statistikData
                result.forEach((ash: ActorStateHistory) => {
                    for (let i = 0; i < ash.actorStateChanges.length; i++) {
                        const element: ActorStateChange = ash.actorStateChanges[i];
                        if (element.state === 'Off') {
                            const correspondingOn: ActorStateChange =
                                ash.actorStateChanges.slice(i + 1).find(x => x.state === 'On');

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
            })
        );
    }

    public putActorOn(deviceId: string, actorId: string): Observable<Actorstate> {
        return this.httpClient.get(this.baseUri + '/devices/' + deviceId + '/actors/' + actorId + '/on',
            { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: Actorstate) => body)
        );
    }

    public putActorOff(deviceId: string, actorId: string): Observable<Actorstate> {
        return this.httpClient.get(this.baseUri + '/devices/' + deviceId + '/actors/' + actorId + '/off',
            { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: Actorstate) => body)
        );
    }
}
