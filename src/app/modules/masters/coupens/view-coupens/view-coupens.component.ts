import { Component, OnInit } from '@angular/core';
import { CoupensService, Coupens } from '../coupens.service';

@Component({
  selector: 'app-view-coupens',
  templateUrl: './view-coupens.component.html',
  styleUrls: ['./view-coupens.component.css']
})
export class ViewCoupensComponent implements OnInit {

  /**
   * list of products categories will be stored
   */
  coupens: Coupens;

  constructor(private coupensService: CoupensService) {
    this.getCouponTypes();
  }

  ngOnInit(): void {
  }


  /**
   * @returns void
   * fetch list of product categories from Api
   */
  getCouponTypes(): void {
    this.coupensService.fetchCoupons().subscribe((res:Coupens) => {
      console.log(res);
      this.coupens = res;
    })
  }

}
