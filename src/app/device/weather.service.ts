import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasicWeather } from '@app/device/basicweather.model';

@Injectable()
export class WeatherService {

  private baseUri = 'https://legardenapim.azure-api.net';

    constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
        this.httpClient.disableApiPrefix();
    }

    public getBasicWeather(): Observable<BasicWeather> {
        return this.httpClient.get(this.baseUri + '/weather/basicweather', { headers: {
            ['Ocp-Apim-Subscription-Key']: this.authenticationService.credentials.subscriptionKey
        }})
        .pipe(
            map((body: BasicWeather) => body)
        );
    }
}
