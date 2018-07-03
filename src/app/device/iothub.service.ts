import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/core';

@Injectable()
export class IothubService {
    private baseUri = 'https://legardenapim.azure-api.net';

    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
        this.httpClient.disableApiPrefix();
    }

    public getDevices(): Observable<any> {
        return this.httpClient.get(this.baseUri + '/devices', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }});
    }
}
