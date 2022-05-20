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
  searchCategory: string = '';

  result = this.courses.map((a: Courses) => a.category);
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      next: (response: any) => {
        this.courses = response;
        console.log(this.courses);
      },
    });

    this.courseService.getCategories().subscribe({
      next: (response: any) => {
        this.categoryList = response;
        // this.count = Object.values(response);
        console.log(response);
      },
    });

    let unique = this.categoryList.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    console.log(this.categoryList.filter((v, i, a) => a.indexOf(v) === i));
  }

  assignCategory(cat: string) {
    console.log(cat);
    this.searchCategory = cat;
    // console.log(this.searchCategory);
  }

  clearFilter() {
    this.searchText = '';
    this.searchCategory = '';
  }
}
