import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngpl-period-picker-test',
  templateUrl: './ngpl-period-picker-test.component.html',
  styleUrls: ['./ngpl-period-picker-test.component.scss']
})
export class NgplPeriodPickerTestComponent implements OnInit {

  index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  items: any[] = [];

  formGroup: FormGroup;
  disableControl = new FormControl();
  readOnlyControl = new FormControl();
  loadingControl = new FormControl();


  constructor(private _formB: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formB.group({
      date: [],
      date1: [],
      date2: [],
      min: [],
      max: [],
      value: [],

    });


  }


}
