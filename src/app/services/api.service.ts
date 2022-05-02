import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../student';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  endpoint: string = 'http://localhost:3000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Add student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/register`;
    return this.http.post(API_URL, data);
  }
  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
  }
}
