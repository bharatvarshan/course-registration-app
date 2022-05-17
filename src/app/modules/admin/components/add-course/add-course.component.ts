import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/modules/course/services/course.service';
import { Courses } from 'src/app/modules/shared/models/course.model';

import { NotificationService } from 'src/app/modules/shared/services/notification.service';

import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  model: Courses = new Courses();
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.adminService.addCourse(form.value).subscribe(
      (response) => {
        console.log(response);
        this.notificationService.notifier.notify(
          'success',
          'Course Added Successfully'
        );

        this.router.navigate(['/admin/dashboard']);
      },
      (err) => console.log(err)
    );
  }
}
