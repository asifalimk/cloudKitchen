import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public isAuthenticated: boolean;
  public sidenavMenuItems: Array<any>;
  constructor(private auth: AuthService, public router: Router){

  }


  ngOnInit() { 
    // this.auth.onChange().subscribe(status => {
    //   this.reactToAuthChange(status);
    // });

    this.isAuthenticated = this.auth.isAuthenticated();

    if (this.isAuthenticated) {
      this.updateMenuItems();
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/sign-in']);
    }
  }


  private reactToAuthChange(status: boolean) {
    this.isAuthenticated = status;

    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
    else{
      this.router.navigate(['/sign-in']);
    }
  }


  private updateMenuItems() {
    if (this.isAuthenticated) {
      this.sidenavMenuItems = this.auth.isAdmin() ? adminMenuItems : staffMenuItems;
    }
  }


  logout() {
    // Logout
    this.auth.logout();
  }
}

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  type: string;
}

export const adminMenuItems: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', type: 'menu' },
  { path: '/masters', title: 'Masters', icon: 'support', type: '' },
  { path: '/icons', title: 'Products', icon: 'category', type: '' },
  { path: '/orders', title: 'Orders', icon: 'wysiwyg', type: 'nested-menu' },
  { path: '/notifications', title: 'Delivery', icon: 'local_shipping', type: '' },
  { path: '/user', title: 'Reports', icon: 'article', type: '' },
  { path: '/table', title: 'Reviews', icon: 'rate_review', type: 'nested-menu' },
  { path: '/config', title: 'Config', icon: 'settings', type: '' },
  { path: '/typography', title: 'Typography', icon: 'edit', type: '' },
];

export const staffMenuItems = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', type: 'menu' },
]