import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './layout.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    TableComponent,
    TypographyComponent,
  ]
})

export class AdminLayoutModule { }
