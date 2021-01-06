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
  parent: ProductCategoriesForm;
  fileToUpload: File = null;
  /**
   * create form form group
   */
  createForm: FormGroup;

  constructor(private http: HttpClient, private dynamicFormsService: DynamicFormsService, private productCategoriesService: ProductCategoriesService) {
    this.createForm = new FormGroup({
      'title': new FormControl(null),
      'description': new FormControl(null),
      'status': new FormControl(false),
      'parent': new FormControl(null),
      'image': new FormControl(null)
    });

    this.getFormStructure();
    this.getParent();

  }

  ngOnInit() {
    this.createForm.get("parent").valueChanges
      .subscribe(f => {
        this.onChanged(f);
      })
  }

  /**
    * @returns void
    * get create categories form structure
    */
  getParent(): void {
    this.dynamicFormsService.getParent().subscribe((res: ProductCategoriesForm) => {
      this.parent = res;
      console.log(this.parent)
    })
  }

  // file upload
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.createForm.get('image').setValue(this.fileToUpload);
  }

  // Choose category using select dropdown
  onChanged(value) {
    console.log(value)
  }

  onChangeImage(event) { 
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createForm.get('image').setValue(file);
      console.log(file)
    }
    // this.fileToUpload = event.target.files[0]; 
    // this.createForm.get('image').setValue(this.fileToUpload);
    // console.log(this.fileToUpload)
} 

  /**
    * @returns void
    * get create categories form structure
    */
  getFormStructure(): void {
    this.dynamicFormsService.getProductCategoriesForm('category').subscribe((res: ProductCategoriesForm) => {
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
      "post": "categories",
      "image":this.createForm.get('image').value,
      "content": this.createForm.value
    }
    let formObj = this.createForm.getRawValue();
    const formData = new FormData();
    formData.append('image', this.createForm.get('image').value);
    formData.append('action', "create");
    formData.append('post', "categories");
    formData.append('content', JSON.stringify(formObj));
    this.productCategoriesService.addProductCategories(formData).subscribe(res => {
    })
  }
}
