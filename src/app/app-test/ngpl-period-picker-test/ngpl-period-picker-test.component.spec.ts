import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplPeriodPickerTestComponent } from './ngpl-period-picker-test.component';

describe('NgplSelectTestComponent', () => {
  let component: NgplPeriodPickerTestComponent;
  let fixture: ComponentFixture<NgplPeriodPickerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplPeriodPickerTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplPeriodPickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
