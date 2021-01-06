import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCouponTypesComponent } from './view-coupontypes/view-coupontypes.component';
import { CreateCouponTypesComponent } from './create-coupontypes/create-coupontypes.component';
import { CouponTypesComponent } from './coupon-types';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: CouponTypesComponent, children: [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    { path: 'view', component: ViewCouponTypesComponent },
    { path: 'create', component: CreateCouponTypesComponent }
  ]
}]
// const routes: Routes = [{
//   path: '',
//   component: CouponTypesComponent, children: [
//      { path: '', redirectTo: 'view-coupontypes', pathMatch: 'full' },
//      { path: 'view-coupontypes', loadChildren: () => import('./view-coupontypes/view-coupontypes.module').then(m => m.ProductCategoriesModule) },
//     //  { path: '', redirectTo: 'coupon-types', pathMatch: 'fulll'},
//     //  {path: '',component: ViewCouponTypesComponent}
//     //  { path: 'coupon-types', loadChildren: () => import('./coupon-types/coupon-types.module').then(m => m.CouponTypesModule) }
//     ]
// }]
@NgModule({
  declarations: [ViewCouponTypesComponent, CouponTypesComponent, CreateCouponTypesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CouponTypesModule { }
