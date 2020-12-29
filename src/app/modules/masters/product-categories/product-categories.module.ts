import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { ProductCategoriesComponent } from './product-categories';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: ProductCategoriesComponent, children: [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    { path: 'view', component: ViewCategoriesComponent },
    { path: 'create', component: CreateCategoriesComponent }
  ]
}]

@NgModule({
  declarations: [ViewCategoriesComponent, ProductCategoriesComponent, CreateCategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProductCategoriesModule { }
