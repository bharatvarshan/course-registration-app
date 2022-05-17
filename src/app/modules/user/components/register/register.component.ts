import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Register } from '../../../shared/models/register.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  model: Register = new Register();
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.authService.registerUser(form.value).subscribe(
      (response) => {
        console.log(form.value);
        let message = JSON.stringify(response);

        console.log(response);
        this.notificationService.notifier.notify('success', message);

        this.router.navigate(['/users/login']);
      },
      (err: HttpErrorResponse) => {
        this.notificationService.notifier.notify('error', err.error.message);

        console.log(err.error.message);
      }
    );
  }

  logValue(check: any) {
    console.log(check);
  }
  checkCheckBoxvalue(event: any) {
    console.log(event.checked);
  }
}
