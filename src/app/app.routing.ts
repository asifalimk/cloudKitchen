import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './modules/layout.component';
import { LayoutResolverService } from './modules/layout.resolver.service';

export const AppRoutes: Routes = [
  { path: 'sign-in', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        resolve: {
          profile: LayoutResolverService
        },
        loadChildren: () => import('./modules/layout.module').then(m => m.AdminLayoutModule)
      }]
  }
]
