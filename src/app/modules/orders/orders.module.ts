import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsDialog, OrdersComponent } from './orders.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: OrdersComponent,
  }
];

@NgModule({
  declarations: [OrdersComponent,OrderDetailsDialog],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents: [
    OrderDetailsDialog
  ],
})
export class OrdersModule { }
