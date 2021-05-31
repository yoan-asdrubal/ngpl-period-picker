import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {Changes} from 'ngx-reactivetoolkit';
import {tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {NGPL_FILTER_BASE, NgplFilterBase} from 'ngpl-common';

const MONTH_MODE_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@UntilDestroy()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngpl-period-picker',
  templateUrl: './ngpl-period-picker.component.html',
  styleUrls: ['./ngpl-period-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgplPeriodPickerComponent),
      multi: true
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MONTH_MODE_FORMATS},
    {
      provide: NGPL_FILTER_BASE, useExisting: forwardRef(() => NgplPeriodPickerComponent)
    }
  ]
})
export class NgplPeriodPickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor, NgplFilterBase {

  rangeDateCtrl = new FormControl();
  /**
   * Mat-Label que se mostrará en el mat-form-field del autocomplete
   */
  @Input() placeHolder = 'Período';

  /**
   * Define el atributo appearance del matFormField, permite los mismos valores
   */
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' | 'default' = 'outline';

  @Input() customClass: '';

  @Input() showLoading = false;
  @Changes('showLoading') showLoading$;

  _value: { anno: number, mes: number } | any;

  /** Maneja valor minimo a seleccionar por el periodo,
   *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha
   */
  @Input() min: any;
  @Changes('min') min$;
  _min: Date;

  /** Maneja valor maximo a seleccionar por el periodo,
   *  puede ser un string ('2019#08'), objeto {anno:2019, mes:8} o una fecha
   */
  @Input() max: any;
  @Changes('max') max$;
  _max: Date;

  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

   disabledControl = false;

  @Input() readOnlyControl = false;


  @Input() disabled: boolean;


  valueChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.min$
      .pipe(
        untilDestroyed(this),
        tap(val => this.procesarPeriodoMinimo(val))
      )
      .subscribe();

    this.max$
      .pipe(
        untilDestroyed(this),
        tap(val => this.procesarPeriodoMaximo(val))
      )
      .subscribe();
  }

  procesarPeriodoMinimo(obj): void {
    if (!!obj) {

      if (typeof obj === 'string') {
        const values: any[] = obj.split('#');
        if (values.length >= 2) {
          this._min = new Date(values[0], values[1] - 1, 1);
        }
      } else if (obj instanceof Date) {
        this._min = obj;
      } else {
        this._min = new Date(obj.anno, obj.mes - 1, 1);
      }
    } else {
      const date = new Date();
      this._min = new Date(date.getFullYear() - 10, date.getMonth() + 1, 1);
    }

  }

  procesarPeriodoMaximo(obj): void {
    if (!!obj) {

      if (typeof obj === 'string') {
        const values: any[] = obj.split('#');
        if (values.length >= 2) {
          this._max = new Date(values[0], values[1], 0);
        }
      } else if (obj instanceof Date) {
        this._max = obj;
      } else {
        this._max = new Date(obj.anno, obj.mes - 1, 0);
      }
    } else {
      const date = new Date();
      this._max = new Date(date.getFullYear() - 10, date.getMonth() + 1, 0);
    }

  }

  dateInput(date: Moment, picker): void {
    picker.close();
    this.rangeDateCtrl.setValue(date);
    const fecha = new Date(this.rangeDateCtrl.value);
    const newValue = {anno: fecha.getFullYear(), mes: fecha.getMonth() + 1};
    this._value = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouch(newValue);
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(): void {
  }

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledControl = isDisabled;
  }

  writeValue(obj: Date | { anno: number, mes: number }): void {
    if (!!obj) {
      if (obj instanceof Date) {
        const newValue = {anno: obj.getFullYear(), mes: obj.getMonth() + 1};
        this._value = newValue;
        this.rangeDateCtrl.setValue(obj);
        this.onChange(newValue);
        this.onTouch(newValue);
      } else {

        this._value = {anno: +obj.anno, mes: +obj.mes};
        this.rangeDateCtrl.setValue(new Date(obj.anno, obj.mes - 1, 1));
      }
    } else {
      const date = new Date();
      const newValue = {anno: date.getFullYear(), mes: date.getMonth() + 1};
      this._value = null;
      this.rangeDateCtrl.setValue(null);
      this.onChange(null);
      this.onTouch(null);
    }
  }

  open(): void {
    this.opened.emit(true);
  }

  close(): void {
    this.closed.emit(true);
  }

  clearValue(): void {
    this._value = null;
    this.rangeDateCtrl.setValue(null);
    this.onChange(null);
    this.onTouch(null);
  }

  newValue(value: any): void {
    this.writeValue(value);
  }
}
