import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormsService, CouponTypesForm } from 'app/shared/dynamic-forms.service';
import { CouponTypesService } from '../coupon-types.service';

@Component({
  selector: 'app-create-coupontypes',
  templateUrl: './create-coupontypes.component.html',
  styleUrls: ['./create-coupontypes.component.css']
})
export class CreateCouponTypesComponent implements OnInit {

  /**
   * form fileds structure 
   */
  formStructure: CouponTypesForm;
  createFormStructure: any;




  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private couponTypesService: CouponTypesService) {
    this.getFormStructure();
  }

  ngOnInit() { 
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
      }
    ]
  }

  /**
    * @returns void
    * get create categories form structure
    */
  getFormStructure(): void {
    this.dynamicFormsService.getProductCategoriesForm('couponType').subscribe((res: CouponTypesForm) => {
      this.formStructure = res;
    })
  }

  /**
   * create new category on sobmit
   */
  onSubmit(data): void {
    const req = {
      "action": "create",
      "post": "coupon_types",
      "content":JSON.stringify(data)
    }

    const formData = new FormData();
    formData.append('action', "create");
    formData.append('post', "coupon_types");
    formData.append('content', data);
    console.log(data,req)
    this.couponTypesService.addCouponTypes(formData).subscribe(res => {
      console.log(res)
    })
  }
}
