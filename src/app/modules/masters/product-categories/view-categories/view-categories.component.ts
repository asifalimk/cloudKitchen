import { Component, OnInit } from '@angular/core';
import { ProductCategoriesService, ProductCategories } from '../product-categories.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  /**
   * list of products categories will be stored
   */
  productCategories: ProductCategories;

  public columnStructure: any = [
    {
      name: "Id",
      key: "id",
      type: "single",
      cols: []
    },
    {
      name: "Image",
      key: "image",
      parent: "content",
      link: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/",
      type: "image",
      cols: ["image"]
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


  constructor(private productCategoriesService: ProductCategoriesService) {
    this.getProductCategories();
  }

  ngOnInit(): void {

  }

  async initTableData() {
    this.tableWidgetData = {
      columnStructure: this.columnStructure,
      data: this.productCategories.message,
      statusInfoNChanges: [],
      tableSearch: true,
      tableName: "Categories",
    };

  }


  /**
   * @returns void
   * fetch list of product categoriesrowClicked from Api
   */
  getProductCategories(): void {
    this.productCategoriesService.fetchProductCategories().subscribe((res: ProductCategories) => {
      console.log(res)
      this.productCategories = res;
      this.initTableData();
    })
  }

  /**
   * 
   * @param data 
   */
  rowClicked(data): void {
    // console.log(data)
  }

}
