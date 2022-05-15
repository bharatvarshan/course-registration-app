import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/modules/course/services/course.service';
import { Courses } from 'src/app/modules/shared/models/course.model';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
})
export class EnrollmentsComponent implements OnInit {
  userId!: string;
  userEnrollments: Courses[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('User_ID') || '{}';

    this.courseService.getUserEnrollments(this.userId).subscribe({
      next: (response: any) => {
        response.forEach((element: any) => {
          this.courseService.getCourse(element).subscribe({
            next: (response: any) => {
              this.userEnrollments.push(response);
            },
          });
        });
        console.log(this.userEnrollments);
      },
    });
  }
}
