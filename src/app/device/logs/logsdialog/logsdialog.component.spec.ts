import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsdialogComponent } from './logsdialog.component';

describe('LogsdialogComponent', () => {
  let component: LogsdialogComponent;
  let fixture: ComponentFixture<LogsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
