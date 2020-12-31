import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoupensComponent } from './view-coupens/view-coupens.component';
import { CreateCoupensComponent } from './create-coupens/create-coupens.component';
import { CoupensComponent } from './coupens';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: CoupensComponent, children: [
    { path: '', redirectTo: 'view', pathMatch: 'full' },
    { path: 'view', component: ViewCoupensComponent },
    { path: 'create', component: CreateCoupensComponent }
  ]
}]

@NgModule({
  declarations: [ViewCoupensComponent, CoupensComponent, CreateCoupensComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CoupensModule { }
