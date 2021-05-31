import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgplPeriodPickerComponent } from './ngpl-period-picker.component';

describe('WidgetPeriodPickerComponent', () => {
  let component: NgplPeriodPickerComponent;
  let fixture: ComponentFixture<NgplPeriodPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgplPeriodPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplPeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
