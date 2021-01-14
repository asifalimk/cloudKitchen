import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: CustomersComponent,
  }
];

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CustomersModule { }
