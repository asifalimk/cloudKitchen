import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: MastersComponent, children: [
     { path: '', redirectTo: 'product-categories', pathMatch: 'full' },
     { path: 'product-categories', loadChildren: () => import('./product-categories/product-categories.module').then(m => m.ProductCategoriesModule) },
    //  { path: '', redirectTo: 'coupon-types', pathMatch: 'fulll'},
    //  {path: '',component: ViewCouponTypesComponent}
     { path: 'coupon-types', loadChildren: () => import('./coupon-types/coupon-types.module').then(m => m.CouponTypesModule) },
     { path: 'coupens', loadChildren: () => import('./coupens/coupens.module').then(m => m.CoupensModule) }
    ]
}]

@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MastersModule { }
