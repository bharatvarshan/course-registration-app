import { Component, OnInit } from '@angular/core';
import { Courses } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  courses: Courses[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        for (let i = 0; i < response.length; i++) {
          this.courses.push(response[i]);
        }
      },
    });

    console.log(this.courses);
  }
}
