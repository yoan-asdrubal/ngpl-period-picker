import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NgplPeriodPickerTestComponent} from './app-test/ngpl-period-picker-test/ngpl-period-picker-test.component';

const routes: Routes = [
  {
    path: 'ngpl-period-picker',
    component: NgplPeriodPickerTestComponent
  }, {
    path: '**',
    component: NgplPeriodPickerTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
