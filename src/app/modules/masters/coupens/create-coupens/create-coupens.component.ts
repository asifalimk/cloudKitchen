import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormsService, CoupensForm } from 'app/shared/dynamic-forms.service';
import { CoupensService } from '../coupens.service';

@Component({
  selector: 'app-create-coupens',
  templateUrl: './create-coupens.component.html',
  styleUrls: ['./create-coupens.component.css']
})
export class CreateCoupensComponent implements OnInit {

  /**
   * form fileds structure 
   */
  formStructure: CoupensForm;

  createFormStructure: any;


  public coupon;
  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private coupensService: CoupensService) {
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
      },
      {
        formcontrol: "coupon types",
        type: "selectBox",
        placeholder: "",
        options: [],
        validators: [{
          name: "required",
          validator: "required",
          message: "coupon types Required"
        }]
      }
    ]
  }

  /**
    * @returns void
    * get create categories form structure
    */
  getFormStructure(): void {
    this.dynamicFormsService.getProductCategoriesForm('coupon').subscribe((res: CoupensForm) => {
      this.formStructure = res;
      console.log(res)
    })
  }


  /**
   * create new category on sobmit
   */
  onSubmit(data): void {
    const req = {
      "action": "create",
      "post": "coupons",
      "content": data
    }

    // console.log(req)
    this.coupensService.addCoupons(req).subscribe(res => {
      console.log(res)
    })
  }
}
