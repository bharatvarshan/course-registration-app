import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courses } from '../../shared/models/course.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url: string = 'http://localhost:3000/admin';
  userurl: string = 'http://localhost:3000/user';

  constructor(private httpClient: HttpClient) {}
  getAllUsers() {
    return this.httpClient.get(`${this.url}/get-students`);
  }

  getCourse(id: string) {
    return this.httpClient.get(`${this.url}/get-course/${id}`);
  }

  getUserEnrollments(userId: string) {
    return this.httpClient.get(`${this.userurl}/enrollments/${userId}`);
  }
  getAllCourses() {
    return this.httpClient.get(`${this.url}/get-courses`);
  }
}
