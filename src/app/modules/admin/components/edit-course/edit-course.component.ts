import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from 'src/app/modules/shared/models/course.model';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  course!: Courses;

  courseId!: string;
  // model: Courses = this.course;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      console.log(this.courseId);
    });

    this.adminService.getCourse(this.courseId).subscribe({
      next: (response: any) => {
        this.course = response;
        console.log(response);
      },
    });

    console.log(this.course);
  }

  onSubmit(form: NgForm) {
    this.adminService.editCourse(form.value, this.courseId).subscribe(
      (response) => {
        console.log(response);
        this.notificationService.notifier.notify(
          'success',
          'Course Updated Successfully'
        );

        this.router.navigate(['/admin/dashboard']);
      },
      (err) => console.log(err)
    );
  }
}
