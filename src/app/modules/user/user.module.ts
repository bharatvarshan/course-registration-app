import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ProfileComponent } from './components/profile/profile.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { TokenInterceptorService } from '../shared/interceptors/token-interceptor.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EnrollmentsComponent,
    EditProfileComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class UserModule {}
