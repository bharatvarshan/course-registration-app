import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
    private notificationService: NotificationService
  ) {}
  model: Login = new Login();

  userId!: string;
  token!: string;
  role!: string;

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log('Clicking');

    this.userService.loginUser(form.value).subscribe(
      (response) => {
        console.log(response);
        this.userId = JSON.parse(JSON.stringify(response)).user._id;
        this.token = JSON.parse(JSON.stringify(response)).token;
        this.role = JSON.parse(JSON.stringify(response)).user.role;

        // alert('Registered Successfully');
        // this.userId = JSON.parse(response);
        localStorage.setItem('Login_Status', 'yes');
        localStorage.setItem('User_ID', this.userId);
        localStorage.setItem('Token', this.token);
        localStorage.setItem('Role', this.role);

        this.notificationService.notifier.notify('success', 'Login Success');

        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
    // console.log(form.value);
  }
}
