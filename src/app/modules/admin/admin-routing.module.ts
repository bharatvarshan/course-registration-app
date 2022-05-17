import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-course/:id',
    component: EditCourseComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
