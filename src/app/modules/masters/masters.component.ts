import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html'
})
export class MastersComponent implements OnInit {

  links = [{ name: "product-categories", link: "/admin/masters/product-categories" },
  { name: "Coupens", link: "/admin/masters/coupens" },
  { name: "Coupen Types", link: "/admin/masters/coupon-types" }];

  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

}
