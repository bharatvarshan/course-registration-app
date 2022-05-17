import { Component, OnInit } from '@angular/core';

import { Courses } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  courses: Courses[] = [];
  categoryList: string[] = [];
  searchText: string = '';
  objArray = [
    {
      foo: 1,
    },
    {
      foo: 2,
    },
    {
      foo: 3,
    },
  ];

  result = this.courses.map((a: Courses) => a.category);
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.courses = response;
        console.log(this.courses);
      },
    });

    console.log(this.result);
    console.log(this.objArray);

    // this.courseService.getCategories().subscribe({
    //   next: (response: any) => {
    //     response.forEach((element: any) => {
    //       this.categoryList.push(element);
    //     });
    //     // this.categoryList = response;
    //     console.log(this.categoryList);
    //   },
    // });

    // this.courses.forEach((course) => {
    //   console.log('hi');

    //   this.categoryList.push(course.category);
    // });

    // console.log(this.categoryList);
  }
}
