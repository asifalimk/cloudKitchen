import { Component, Input, OnInit } from '@angular/core';
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
  menus: Array<any>;

  constructor(private auth: AuthService, public router: Router) {

  }


  ngOnInit() {
    // this.auth.onChange().subscribe(status => {
    //   this.reactToAuthChange(status);
    // })

    this.isAuthenticated = this.auth.isAuthenticated();

    if (this.isAuthenticated) {
      this.updateMenuItems();
    }
  }



  private reactToAuthChange(status: boolean) {
    this.isAuthenticated = status;

    if (this.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/sign-in']);
    }
  }


  /***
   * display sidenav menu items with 
   * specific conditions,
   * 
   */
  private updateMenuItems() {
    if (this.isAuthenticated) {
      this.sidenavMenuItems = this.auth.isAdmin() ? adminMenuItems : this.auth.isRootAdmin() ? rootAdminMenuItems : staffMenuItems;
    }
  }

  // Logout
  logout() {
    this.auth.logout();
  }

}

export class SidenavMenu {
  constructor(public id: number,
    public title: string,
    public icon: string,
    public routerLink: string,
    public href: string,
    public target: string,
    public hasSubMenu: boolean,
    public parentId: number) { }
}

export const adminMenuItems = [
  new SidenavMenu(1, 'Dashboard', 'dashboard', '/admin/dashboard', null, null, false, 0),
  new SidenavMenu(2, 'Masters', 'support', '/admin/masters', null, null, true, 0),
  new SidenavMenu(3, 'Config', 'settings', '/admin/config', null, null, false, 0),
  new SidenavMenu(4, 'Product Categories', 'category', '/admin/masters/product-categories', null, null, false, 2),
  new SidenavMenu(5, 'Coupens', 'local_offer', '/admin/masters/coupens', null, null, false, 2),
  new SidenavMenu(6, 'Coupen Types', 'wysiwyg', '/admin/masters/coupon-types', null, null, false, 2),
  new SidenavMenu(7, 'Orders', 'view_list', '/admin/orders', null, null, false, 0),
]

export const staffMenuItems = [
  new SidenavMenu(1, 'Dashboard', 'dashboard', '/admin/dashboard', null, null, false, 0)
]

export const rootAdminMenuItems = [
  new SidenavMenu(1, 'Dashboard', 'dashboard', '/admin/dashboard', null, null, false, 0),
  new SidenavMenu(2, 'Masters', 'support', '/admin/masters', null, null, true, 0),
  new SidenavMenu(3, 'Config', 'settings', '/admin/config', null, null, false, 0),
  new SidenavMenu(4, 'Product Categories', 'category', '/admin/masters/product-categories', null, null, false, 2),
  new SidenavMenu(5, 'Coupens', 'local_offer', '/admin/masters/coupens', null, null, false, 2),
  new SidenavMenu(6, 'Coupen Types', 'wysiwyg', '/admin/masters/coupon-types', null, null, false, 2),
  new SidenavMenu(7, 'Orders', 'view_list', '/admin/orders', null, null, false, 0),
  new SidenavMenu(8, 'Users', 'vpn_key', '/admin/users', null, null, false, 0),
  new SidenavMenu(9, 'Customers', 'account_circle', '/admin/customers', null, null, false, 0)
]







