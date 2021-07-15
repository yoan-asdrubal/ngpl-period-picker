import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'ngpl-period-picker-test',
  templateUrl: './ngpl-share-period-picker-test.component.html',
  styleUrls: ['./ngpl-share-period-picker-test.component.scss']
})
export class NgplSharePeriodPickerTestComponent implements OnInit {

  disableControl = new FormControl();
  readOnlyControl = new FormControl();
  loadingControl = new FormControl();

  storeKey = 'CUSTOM-STORE-KEY';

  constructor(private _formB: FormBuilder) {
  }

  ngOnInit(): void {

  }


}
