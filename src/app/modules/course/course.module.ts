import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { BrowseComponent } from './components/browse/browse.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BrowseComponent],
  imports: [CommonModule, CourseRoutingModule, SharedModule],
})
export class CourseModule {}
