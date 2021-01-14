import { Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '', component: AdminLayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
            { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard] },
            { path: 'masters', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule), canActivate: [AuthGuard] },
            { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), canActivate: [AuthGuard] }
        ]
    }
];
