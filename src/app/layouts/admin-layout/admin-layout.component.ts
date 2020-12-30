import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  routes=ROUTES;

  ngOnInit() { 
    
  }
}

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  type: string;
  subMenus:Array<any>;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', type: 'menu',subMenus:[] },
  { path: '/masters', title: 'Masters', icon: 'support', type: '' ,subMenus:[]},
  { path: '/icons', title: 'Products', icon: 'category', type: '',subMenus:[] },
  { path: '/orders', title: 'Orders', icon: 'wysiwyg', type: 'nested-menu',subMenus:[{title:"Order",link:"/orders"}] },
  { path: '/notifications', title: 'Delivery', icon: 'local_shipping', type: '',subMenus:[] },
  { path: '/user', title: 'Reports', icon: 'article', type: '',subMenus:[] },
  { path: '/table', title: 'Reviews', icon: 'rate_review', type: 'nested-menu',subMenus:[] },
  { path: '/config', title: 'Config', icon: 'settings', type: '',subMenus:[] },
  { path: '/typography', title: 'Typography', icon: 'edit', type: '',subMenus:[] },
];
