import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnalyticLog } from '@app/device/analyticlog.model';

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
}
