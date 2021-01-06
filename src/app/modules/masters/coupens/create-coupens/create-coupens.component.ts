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

  /**
   * create form form group
   */
  createForm: FormGroup;
  public coupon;
  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private coupensService: CoupensService) {
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
    this.dynamicFormsService.getCouponTypesForm().subscribe((res: CoupensForm) => {
      this.formStructure = res;
      console.log(res)
    })
  }

  
  /**
   * create new category on sobmit
   */
  onSubmit(): void {
    const req = {
      "action": "create",
      "post": "coupons",
      "content": this.createForm.value
    }

    console.log(req)
    this.coupensService.addCoupons(req).subscribe(res => {
      console.log(res)
    })
  }
}
