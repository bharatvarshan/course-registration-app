import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Register } from '../../../shared/models/register.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm: any;
  private readonly notifier: NotifierService;
  constructor(
    private userService: UserService,
    private router: Router,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  model: Register = new Register();
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(
      (response) => {
        console.log(response);
        this.notifier.notify('success', 'User Added Successfully');

        this.router.navigate(['/users/login']);
      },
      (err) => console.log(err)
    );
    console.log(form.value);
  }
}
