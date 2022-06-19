import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'login';
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router:Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
      //   '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      // ),]),
      password: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required,Validators.pattern(
      //   '^(?=.*[a-z])(?=.*[A-Z]).{8,12}$'
      // )])
    });
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
   
    this.authService.login(username, password).subscribe(
      (data:any) => {
        this.tokenStorage.saveToken(data.access_token); 
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        if(this.isLoggedIn){
          this.router.navigate(['/home']).then( (e) => {
            if (e) {
              window.location.reload();
            } 
          });
        }
      },
      err => {
        //this.loginForm.resetForm()
        console.log("Login has failed!");         
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    )
  }
  reloadPage(): void {
    window.location.reload();
  }
}