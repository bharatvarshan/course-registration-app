import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
import { Courses } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url: string = 'http://localhost:3000/admin';
  userurl: string = 'http://localhost:3000/user';
  coursesDetails: Courses[] = [];
  constructor(private httpClient: HttpClient) {}

  getAllCourses() {
    return this.httpClient.get(`${this.url}/get-courses`);
  }

  getCourse(id: string) {
    return this.httpClient.get(`${this.url}/get-course/${id}`);
  }

  getUserEnrollments(userId: string) {
    return this.httpClient.get(`${this.userurl}/enrollments/${userId}`);
  }

  enrollCourse(userId: string, courseId: string) {
    console.log(`${this.userurl}/${userId}/enroll-course/${courseId}`);

    return this.httpClient.get(
      `${this.userurl}/${userId}/enroll-course/${courseId}`
    );
  }
}
