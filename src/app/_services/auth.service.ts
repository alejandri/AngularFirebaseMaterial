import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'https://cambiappback.app/api';

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

}