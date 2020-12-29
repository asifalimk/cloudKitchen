import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormsService, ProductCategoriesForm } from 'app/shared/dynamic-forms.service';
import { ProductCategoriesService } from '../product-categories.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  /**
   * form fileds structure 
   */
  formStructure: ProductCategoriesForm;

  /**
   * create form form group
   */
  createForm: FormGroup;

  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private productCategoriesService: ProductCategoriesService) {
    this.createForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'status': new FormControl(false)
    });

    this.getFormStructure();
  }

  ngOnInit() { }

  /**
    * @returns void
    * get create categories form structure
    */
  getFormStructure(): void {
    this.dynamicFormsService.getProductCategoriesForm().subscribe((res: ProductCategoriesForm) => {
      this.formStructure = res;
    })
  }

  /**
   * create new category on sobmit
   */
  onSubmit(): void {
    this.productCategoriesService.addProductCategories(this.createForm.value).subscribe(res => {
    })
  }
}
