import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorstatedaydialogComponent } from './actorstatedaydialog.component';

describe('ActorstatedaydialogComponent', () => {
  let component: ActorstatedaydialogComponent;
  let fixture: ComponentFixture<ActorstatedaydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorstatedaydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorstatedaydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
