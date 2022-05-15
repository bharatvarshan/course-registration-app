import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/models/login.model';
import { Register } from '../../shared/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000';
  isLoggedIn!: string;
  isAdmin!: boolean;
  constructor(private httpClient: HttpClient) {
    this.isLoggedIn = localStorage.getItem('Login_Status') || 'no';
    this.isAdmin = localStorage.getItem('Role') == 'admin';
  }

  registerUser(userObject: Register) {
    console.log('entering register service');
    console.log(`${this.url}/signup`);
    console.log(userObject);

    return this.httpClient.post(`${this.url}/signup`, userObject);
  }

  loginUser(userObject: Login) {
    return this.httpClient.post(`${this.url}/login`, userObject);
  }
}