import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Courses } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course!: Courses;
  courseId!: string;
  userId!: string;
  userEnrollments!: string[];
  isEnrolled!: boolean;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('User_ID') || '{}';
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      console.log(this.courseId);
    });

    this.courseService.getCourse(this.courseId).subscribe({
      next: (response: any) => {
        this.course = response;
        console.log(response);
      },
    });

    this.courseService.getUserEnrollments(this.userId).subscribe({
      next: (response: any) => {
        this.userEnrollments = response;
        this.isEnrolled = response.some((id: any) => id == this.courseId);
        console.log(this.isEnrolled);
      },
    });
  }

  onSubmit(form: NgForm) {
    this.courseService.enrollCourse(this.userId, this.courseId).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'Course Enrolled Successfully'
        );
        this.router.navigate(['/users/my-enrollments']);
      },
    });
  }

  navigateToEnrollments() {
    this.router.navigate(['/users/my-enrollments']);
  }
}
