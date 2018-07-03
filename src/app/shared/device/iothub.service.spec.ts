import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { IothubService } from './iothub.service';
import { CoreModule, AuthenticationService } from '@app/core';
import { HttpClient } from '@angular/common/http';

// describe('IothubService - IntegrationTests', () => {
//   let iothubService: IothubService;
//   let httpClient: HttpClient;
//   let authService: AuthenticationService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//         imports: [
//             CoreModule
//         ],
//         providers: [IothubService]
//     });
//   });

//   beforeEach(inject([
//     IothubService,
//     HttpClient,
//     AuthenticationService
//   ], (_iotHubService: IothubService, _httpClient: HttpClient, _authenticationService: AuthenticationService) => {
//     iothubService = _iotHubService;
//     httpClient = _httpClient;
//     authService = _authenticationService;
//     authService.login({subscriptionKey: '', remember: false});
//   }));

//   it('should get devices', (done: any) => {
//     iothubService.getDevices().subscribe((devices: any[]) => {
//         expect(devices).toBeDefined();
//         expect(devices.length).toBeGreaterThan(0);
//         done();
//     });
//   });

//   afterEach(() => {
//     // Cleanup
//   });
// });
