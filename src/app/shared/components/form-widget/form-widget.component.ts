import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-widget',
  templateUrl: './form-widget.component.html',
  styleUrls: ['./form-widget.component.css']
})
export class FormWidgetComponent implements OnInit {

  @Input() formStructure;

  @Output() saveButtonClicked = new EventEmitter();

  constructor( protected sanitizer: DomSanitizer) { }

  formGroup: FormGroup = new FormGroup({});

 /**
  * 
  */
 imageUrlTemp: any;


  ngOnInit(): void {
    this.initiateForm();

  }


  initiateForm() {
    this.formStructure.forEach(value => {
      this.formGroup.addControl(
        value.formcontrol,
        new FormControl("", this.getValidators(value.validators))
      );
    });

  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.saveButtonClicked.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }


  /**
   * 
   * @param validatorsList 
   * creating form validations
   * //TODO add appropriate validation cases
   */
  private getValidators(validatorsList: Array<any>): Array<ValidatorFn> {
    const validators: Array<ValidatorFn> = [];
    validatorsList.forEach((validator: any) => {
      switch (validator.name) {
        case "required":
          validators.push(Validators.required);
          break;
        case "email":
          validators.push(Validators.email);
          break;
        default:
          break;
      }
    });

    return validators;
  }

  /**
   * 
   * @param event 
   * 
   */
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileName = file['name'];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.imageUrlTemp = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        const localUrl = _event.target.result;
        this.formGroup.get('image').setValue(file);
      }
    }
  }

}


export interface formType {
  name: string;
  formcontrol: string;
  type: string;
  placeholder: string;
  validators: Validator[];
}

interface Validator {
  name: string;
  validator: string;
  message: string;
}