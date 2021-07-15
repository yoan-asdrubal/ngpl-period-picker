import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgplSharePeriodPickerTestComponent } from './ngpl-share-period-picker-test.component';

describe('NgplSelectTestComponent', () => {
  let component: NgplSharePeriodPickerTestComponent;
  let fixture: ComponentFixture<NgplSharePeriodPickerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgplSharePeriodPickerTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplSharePeriodPickerTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
