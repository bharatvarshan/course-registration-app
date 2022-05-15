import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './components/browse/browse.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'course/:id',
    component: CourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
