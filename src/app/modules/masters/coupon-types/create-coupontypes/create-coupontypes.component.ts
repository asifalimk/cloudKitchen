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

  /**
   * create form form group
   */
  createForm: FormGroup;

  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private couponTypesService: CouponTypesService) {
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
    this.dynamicFormsService.getProductCategoriesForm('couponType').subscribe((res: CouponTypesForm) => {
      this.formStructure = res;
    })
  }

  /**
   * create new category on sobmit
   */
  onSubmit(): void {
    const req = {
      "action": "create",
      "post": "coupon_types",
      "content": this.createForm.value
    }
    this.couponTypesService.addCouponTypes(req).subscribe(res => {
    })
  }
}
