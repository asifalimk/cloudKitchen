import { Routes } from '@angular/router';
import { LayoutResolverService } from './modules/layout.resolver.service';

export const AppRoutes: Routes = [
  { path: 'sign-in', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  {
    path: 'admin',
    resolve: {
      profile: LayoutResolverService
    },
    loadChildren: () => import('./modules/layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  }

]
