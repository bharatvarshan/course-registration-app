import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { BrowseComponent } from './components/browse/browse.component';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BrowseComponent, CourseDetailComponent],
  imports: [CommonModule, CourseRoutingModule, SharedModule, FormsModule],
})
export class CourseModule {}
