import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgplCommonDirectivesModule, NgplCommonModule} from 'ngpl-common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgplPeriodPickerComponent} from './ngpl-period-picker/ngpl-period-picker.component';
import {NgplFilterModule} from 'ngpl-filter';
import {NgplSharePeriodPickerComponent} from './ngpl-share-period-picker/ngpl-share-period-picker.component';

const components = [
  NgplPeriodPickerComponent, NgplSharePeriodPickerComponent
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    OverlayModule,
    NgplCommonModule,
    NgplFilterModule,
    NgplCommonDirectivesModule
  ]
})
export class NgplPeriodPickerModule {
}
