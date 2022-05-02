import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddStudentComponent } from './components/admin/add-student/add-student.component';
import { EditStudentComponent } from './components/admin/edit-student/edit-student.component';
import { StudentsListComponent } from './components/admin/students-list/students-list.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentsListComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
