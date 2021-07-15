import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgplSharePeriodPickerComponent} from './ngpl-share-period-picker.component';

describe('NominaPeriodPickerComponent', () => {
  let component: NgplSharePeriodPickerComponent;
  let fixture: ComponentFixture<NgplSharePeriodPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgplSharePeriodPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgplSharePeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
