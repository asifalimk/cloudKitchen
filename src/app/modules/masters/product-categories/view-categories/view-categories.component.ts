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

  constructor(private productCategoriesService: ProductCategoriesService) {
    this.getProductCategories();
  }

  ngOnInit(): void {
  }


  /**
   * @returns void
   * fetch list of product categories from Api
   */
  getProductCategories(): void {
    this.productCategoriesService.fetchProductCategories().subscribe((res:ProductCategories) => {
      this.productCategories = res;
    })
  }

}
