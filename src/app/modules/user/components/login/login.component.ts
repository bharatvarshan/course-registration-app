import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { Login } from '../../../shared/models/login.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,

    private router: Router,
    private notificationService: NotificationService
  ) {}
  model: Login = new Login();

  userId!: string;
  token!: string;
  role!: string;
  refresh_token!: string;
  expiry!: string;
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log('Clicking');

    this.authService.loginUser(form.value).subscribe(
      (response) => {
        console.log(response);

        this.userId = JSON.parse(JSON.stringify(response)).user._id;
        this.token = JSON.parse(JSON.stringify(response)).token;
        this.refresh_token = JSON.parse(JSON.stringify(response)).refresh_token;
        this.role = JSON.parse(JSON.stringify(response)).user.role;

        // console.log(typeof this.expiry);

        // alert('Registered Successfully');
        // this.userId = JSON.parse(response);
        Promise.resolve().then(() => {
          localStorage.setItem('Login_Status', 'yes');
          localStorage.setItem('User_ID', this.userId);
          localStorage.setItem('Token', this.token);
          localStorage.setItem('Role', this.role);
          localStorage.setItem('Refresh_Token', this.refresh_token);
        });
        // localStorage.setItem('Login_Status', 'yes');
        // localStorage.setItem('User_ID', this.userId);
        // localStorage.setItem('Token', this.token);
        // localStorage.setItem('Role', this.role);

        this.notificationService.notifier.notify('success', 'Login Success');

        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      (err) => {
        this.notificationService.notifier.notify('error', err.error.message);
        console.log(err);
      }
    );
    // console.log(form.value);
  }
}
