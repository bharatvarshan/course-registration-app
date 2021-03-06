import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../shared/models/login.model';
import { Register } from '../../shared/models/register.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // url: string = 'http://35.154.176.94:3000';
  adminurl: string = 'http://35.154.176.94:3000/admin';

  // isLoggedIn!: string;
  // isAdmin!: boolean;
  constructor(private httpClient: HttpClient) {
    // this.isLoggedIn = localStorage.getItem('Login_Status') || 'no';
    // this.isAdmin = localStorage.getItem('Role') == 'admin';
  }

  // isAdmin() {
  //   if (localStorage.getItem('Role') == 'admin') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  getUser(id: string) {
    return this.httpClient.get(`${this.adminurl}/get-student/${id}`);
  }

  getUserAvailable(userObject: Object) {
    return this.httpClient.get(`${this.adminurl}/get-student`, userObject);
  }

  editUser(userObject: User, id: string) {
    return this.httpClient.post(
      `${this.adminurl}/update-student/${id}`,
      userObject
    );
  }

  deleteUser(id: string) {
    return this.httpClient.get(`${this.adminurl}/delete-student/${id}`);
  }
}
