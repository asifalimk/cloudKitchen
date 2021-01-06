import { Component, OnInit } from '@angular/core';
import { CouponTypesService, CouponTypes } from '../coupon-types.service';

@Component({
  selector: 'app-view-coupontypes',
  templateUrl: './view-coupontypes.component.html',
  styleUrls: ['./view-coupontypes.component.css']
})
export class ViewCouponTypesComponent implements OnInit {

  /**
   * list of products categories will be stored
   */
  couponTypes: CouponTypes;

  constructor(private couponTypesService: CouponTypesService) {
    this.getCouponTypes();
  }

  ngOnInit(): void {
  }


  /**
   * @returns void
   * fetch list of product categories from Api
   */
  getCouponTypes(): void {
    this.couponTypesService.fetchCouponTypes().subscribe((res:CouponTypes) => {
      console.log(res);
      this.couponTypes = res;
    })
  }

}
