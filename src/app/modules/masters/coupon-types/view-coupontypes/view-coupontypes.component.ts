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

  public columnStructure: any = [
    {
      name: "Id",
      key: "id",
      type: "single",
      cols: []
    },
    {
      name: "Title",
      key: "title",
      parent: "content",
      type: "single",
      cols: ["title"]
    },  
    {
      name: "Description",
      key: "description",
      parent: "content",
      type: "single",
      cols: ["description"]
    },
  ];

  public tableWidgetData: {
    columnStructure: Array<object>,
    tableName: string,
    data: any,
    statusInfoNChanges: object,
    tableSearch: boolean

  };

  public tableData: any;

  constructor(private couponTypesService: CouponTypesService) {
    this.getCouponTypes();
  }

  ngOnInit(): void {
  }

  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: this.couponTypes.message,
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Coupon Types",
    };

  }

  /**
   * @returns void
   * fetch list of product categories from Api
   */
  getCouponTypes(): void {
    this.couponTypesService.fetchCouponTypes().subscribe((res:CouponTypes) => {
      console.log(res);
      this.couponTypes = res;
      this.initTableData();
    })
  }

}
