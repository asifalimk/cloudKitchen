import { Routes } from '@angular/router';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { TableComponent } from '../../modules/table/table.component';
import { TypographyComponent } from '../../modules/typography/typography.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'orders', loadChildren: () => import('../../modules/orders/orders.module').then(m => m.OrdersModule) },
    { path: 'masters', loadChildren: () => import('../../modules/masters/masters.module').then(m => m.MastersModule) }
];
