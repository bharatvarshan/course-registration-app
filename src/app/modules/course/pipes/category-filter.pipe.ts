import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from '../../shared/models/course.model';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(courses: Courses[], searchText: string): any[] {
    if (!courses) return [];
    if (!searchText) return courses;

    searchText = searchText.toLowerCase();
    return courses.filter((course) => {
      return course.courseName.toLowerCase().includes(searchText);
    });
  }
}
