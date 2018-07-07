import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Device } from './device.model';
import { Actorstate } from '@app/device/actorstate.model';

@Injectable()
export class IothubService {
    private baseUri = 'https://legardenapim.azure-api.net';

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
            map((body: Actorstate[]) => body)
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
