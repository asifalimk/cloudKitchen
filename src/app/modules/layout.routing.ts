import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', component: AdminLayoutComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
    { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule), canActivate: [AuthGuard] }
];