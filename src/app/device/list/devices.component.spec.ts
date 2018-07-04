import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { IothubService } from './iothub.service';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule
      ],
      declarations: [ DevicesComponent ],
      providers: [
        IothubService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
