import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService,public router: Router,public snackBar: MatSnackBar) {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    console.log(this.authService.isAuthenticated())
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
        if (res == true) {
          this.router.navigate(['/dashboard']);
        }
      },(error)=>{
        this.snackBar.open('Invalid Username or Password', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        return null;
      })
    }
  }
}
