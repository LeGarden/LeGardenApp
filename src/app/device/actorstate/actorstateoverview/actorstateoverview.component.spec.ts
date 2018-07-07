import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorstateoverviewComponent } from './actorstateoverview.component';

describe('ActorstateoverviewComponent', () => {
  let component: ActorstateoverviewComponent;
  let fixture: ComponentFixture<ActorstateoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorstateoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorstateoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
