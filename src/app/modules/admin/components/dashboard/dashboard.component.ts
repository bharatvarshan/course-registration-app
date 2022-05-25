import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Courses } from '../../../shared/models/course.model';
import { User } from '../../../shared/models/user.model';
import { NotificationService } from '../../../shared/services/notification.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  courses: Courses[] = [];

  users: User[] = [];
  instructorsCount: number = 0;
  activeElement: string = 'User';

  toggleElement(element: any) {
    this.activeElement = element == 'User' ? 'User' : 'Course';
    // this.activeElement = 'courses';
    console.log(this.activeElement);
    // console.log(element);
  }
  ngOnInit(): void {
    // console.log(this.activeElement);

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
        this.users?.forEach((element: any) => {
          console.log(element);

          if (element.role === 'admin') {
            // console.log('yes');

            this.instructorsCount = this.instructorsCount + 1;
          }
        });
        // console.log(this.users);
        // console.log(this.instructorsCount);
      },
    });

    // let string = 'admin';
    // console.log(JSON.parse(`{"role" : "${string}"}`));
  }

  removeUser(id: number) {
    this.adminService.deleteUser(String(id)).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'User Removed Successfully'
        );

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  }

  removeCourse(id: number) {
    this.adminService.deleteCourse(String(id)).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'Course Remove Successfully'
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  }

  makeAdmin(id: number) {
    this.adminService.makeAdmin(String(id)).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'Updated Successfully'
        );
        // console.log(role);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  }

  makeStudent(id: number) {
    this.adminService.makeStudent(String(id)).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'Updated Successfully'
        );
        // console.log(role);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
    });
  }

  getInstructorCount() {
    this.users.forEach((element) => {
      if (element.role == 'instructor') {
        this.instructorsCount++;
      }
      console.log(element);
    });
  }
}
