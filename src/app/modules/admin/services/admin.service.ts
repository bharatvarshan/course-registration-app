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

  getUserEnrollments(userId: string) {
    return this.httpClient.get(`${this.userurl}/enrollments/${userId}`);
  }

  deleteUser(userId: string) {
    return this.httpClient.get(`${this.url}/delete-student/${userId}`);
  }

  makeAdmin(userId: string) {
    return this.httpClient.patch(`${this.url}/update-toAdmin/${userId}`, {
      role: 'admin',
    });
  }

  makeStudent(userId: string) {
    return this.httpClient.patch(`${this.url}/update-toUser/${userId}`, {
      role: 'student',
    });
  }

  addCourse(userObject: Courses) {
    return this.httpClient.post(`${this.url}/add-course`, userObject);
  }

  editCourse(userObject: Courses, id: string) {
    return this.httpClient.post(`${this.url}/update-course/${id}`, userObject);
  }

  getCourse(id: string) {
    return this.httpClient.get(`${this.url}/get-course/${id}`);
  }

  getAllCourses() {
    return this.httpClient.get(`${this.url}/get-courses`);
  }

  deleteCourse(courseId: string) {
    return this.httpClient.get(`${this.url}/delete-course/${courseId}`);
  }
}
