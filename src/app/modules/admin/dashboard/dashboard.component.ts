import { Component, OnInit } from '@angular/core';
import { Courses } from '../../shared/models/course.model';
import { User } from '../../shared/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  courses: Courses[] = [];

  users: User[] = [];
  activeElement: string = 'users';

  toggleElement() {
    // this.activeElement = this.activeElement == 'users' ? 'courses' : 'users';
    this.activeElement = 'courses';
  }
  ngOnInit(): void {
    this.adminService.getAllCourses().subscribe({
      next: (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.courses.push(response[i]);
        }
        console.log(this.courses);
      },
    });

    // this.adminService.getUserEnrollments(this.userId).subscribe({
    //   next: (response: any) => {
    //     response.forEach((element: any) => {
    //       this.adminService.getCourse(element).subscribe({
    //         next: (response: any) => {
    //           this.userEnrollments.push(response);
    //         },
    //       });
    //     });
    //     console.log(this.userEnrollments);
    //   },
    // });

    this.adminService.getAllUsers().subscribe({
      next: (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.users.push(response[i]);
        }
        console.log(this.users);
      },
    });
  }
}
