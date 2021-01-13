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

  public tableData: any;

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
    // {
    //   name: "Coupen Type",
    //   key: "coupon_type",
    //   parent: "description",
    //   type: "single",
    //   cols: ["description"]
    // },
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
      this.coupens = res;
      this.initTableData();
      
    })
  }


  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: this.coupens.message,
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Coupens",
    };

  }
}
