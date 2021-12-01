import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {filter, tap} from 'rxjs/operators';
import * as uuid from 'uuid';
import {NgplRxLocalstoreService} from 'ngpl-rx-local-store';
import {NgplRxCookieStoreService} from 'ngpl-rx-cookie-store';

@UntilDestroy()
@Component({
  selector: 'ngpl-share-period-picker',
  templateUrl: './ngpl-share-period-picker.component.html',
  styleUrls: ['./ngpl-share-period-picker.component.scss']
})
export class NgplSharePeriodPickerComponent implements OnInit {

  @Input() storeKey = 'SHARED-PERIOD-PICKER';
  id = uuid.v4();
  propagation = false;
  periodoCtrl = new FormControl();
  @Input() customClass = '';
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' | 'default' = 'outline';
  @Input() placeHolder = 'Periodo';
  @Input() shareOn: 'cookie' | 'localStore' | 'all' = 'cookie';

  @Input() floatLabel = '';
  /**
   * Define el atributo appearance del matFormField, permite los mismos valores
   */
  @Input() showLoading = false;
  @Input() showLoadingWidth = '100%';
  @Input() showLoadingHeight = '15px';
  @Input() min: any;
  @Input() max: any;
  @Input() value = null;
  @Input() readOnlyControl = false;
  @Input() disabledControl = false;

  constructor(private localStoreService: NgplRxLocalstoreService, private cookieService: NgplRxCookieStoreService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.shareOn === 'cookie' || this.shareOn === 'all') {
      this.periodoCtrl.setValue(this.cookieService.get(this.storeKey, this.value));
    }
    if (this.shareOn === 'localStore' || this.shareOn === 'all') {
      this.periodoCtrl.setValue(this.localStoreService.getItem(this.storeKey, this.value));
    }

    this.periodoCtrl.valueChanges
      .pipe(
        untilDestroyed(this),
        filter(value => !this.propagation),
        tap(val => {
          const value = {...val, id: this.id};
          if (this.shareOn === 'cookie' || this.shareOn === 'all') {
            this.cookieService.set(this.storeKey, value);
          }
          if (this.shareOn === 'localStore' || this.shareOn === 'all') {
            this.localStoreService.setItem(this.storeKey, value);
          }
          this.propagation = false;
        })
      )
      .subscribe();

    if (this.shareOn === 'cookie' || this.shareOn === 'all') {
      this.cookieService.valueChanges(this.storeKey)
        .pipe(
          untilDestroyed(this),
          filter(value => {
            return !value.id || value.id !== this.id;
          }),
          tap((value) => {
            this.propagation = true;
            this.periodoCtrl.setValue(value);
          })
        )
        .subscribe();
    }
    if (this.shareOn === 'localStore' || this.shareOn === 'all') {
      this.localStoreService.valueChanges(this.storeKey)
        .pipe(
          untilDestroyed(this),
          filter(value => {
            return !value.id || value.id !== this.id;
          }),
          tap((value) => {
            this.propagation = true;
            this.periodoCtrl.setValue(value);
          })
        )
        .subscribe();
    }
  }

}
