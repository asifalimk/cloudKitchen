import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  parent: ProductCategoriesForm;
  fileToUpload: File = null;
  /**
   * create form form group
   */


  createFormStructure: any;


  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private productCategoriesService: ProductCategoriesService, private _snackBar: MatSnackBar) {
    this.getFormStructure();
    this.getParent();

  }

  ngOnInit() {
  }

  /**
    * @returns void
    * get create categories form structure
    */
  getParent(): void {
    this.dynamicFormsService.getParent().subscribe((res: any) => {
      console.log(res)
      this.parent = res.message;
      this.createFormStructure = [
        {
          name: "Title",
          formcontrol: "title",
          type: "textbox",
          placeholder: "title",
          validators: [{
            name: "required",
            validator: "required",
            message: "Title Required"
          }]
        },
        {
          name: "Description",
          formcontrol: "description",
          type: "textArea",
          placeholder: "description",
          validators: [{
            name: "required",
            validator: "required",
            message: "Description Required"
          }]
        },
        {
          name: "Status",
          formcontrol: "status",
          type: "radio",
          options: [{
            id: 1,
            name: 'Active',
          },
          {
            id: 2,
            name: 'In Active',
          }],
          placeholder: "status",
          validators: [{
            name: "required",
            validator: "required",
            message: "Status Required"
          }]
        },
        {
          formcontrol: "parent",
          type: "selectBox",
          placeholder: "",
          options: this.parent,
          validators: [{
            name: "required",
            validator: "required",
            message: "Parent Required"
          }]
        },
        {
          formcontrol: "image",
          type: "image",
          placeholder: "",
          validators: []
        }
      ]
    })
  }

 



  /**
    * @returns void
    * get create categories form structure
    */
  getFormStructure(): void {
    this.dynamicFormsService.getProductCategoriesForm('category').subscribe((res: ProductCategoriesForm) => {
      this.formStructure = res;
    })
  }

  /**
   * create new category on sobmit
   */
  onSubmit(data): void {
    const formData = new FormData();
    formData.append('image', data['image']);
    formData.append('action', "create");
    formData.append('post', "categories");
    formData.append('content', JSON.stringify(data));
    this.productCategoriesService.addProductCategories(formData).subscribe(res => {
      this._snackBar.open("item Added", '×', { panelClass: 'snackbar-success', duration: 3000 });
    })
  }
}
