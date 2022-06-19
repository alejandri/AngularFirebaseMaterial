import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost/api';

// Http Options
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}  

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    let user_data = { username, password };
    return this.http.post(AUTH_API + '/login', user_data, httpOptions)
  }  

  validateCode(data:any){
    return this.http.post(AUTH_API + '/validate_code', JSON.stringify(data), httpOptions)
  }  

  resetPassword(data:any){
    return this.http.post(AUTH_API + '/change_password', JSON.stringify(data), httpOptions)
  } 

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signin', {
  //     username,
  //     password
  //   }, httpOptions);
  // }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }




}