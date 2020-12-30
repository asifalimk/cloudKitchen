import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  hide = false;
  private window = window;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      code: new FormControl("", [Validators.required]),
      mobile: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  /**
   * 
   */
  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(res => {
        console.log(res)
      })
    }
  }
}
