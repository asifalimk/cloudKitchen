import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MastersComponent } from './masters.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: MastersComponent, children: [
     { path: '', redirectTo: 'product-categories', pathMatch: 'full' },
     { path: 'product-categories', loadChildren: () => import('./product-categories/product-categories.module').then(m => m.ProductCategoriesModule) }
  ]
}]

@NgModule({
  declarations: [MastersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MastersModule { }
