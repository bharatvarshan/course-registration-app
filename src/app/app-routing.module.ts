import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './components/admin/add-student/add-student.component';
import { EditStudentComponent } from './components/admin/edit-student/edit-student.component';
import { StudentsListComponent } from './components/admin/students-list/students-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
