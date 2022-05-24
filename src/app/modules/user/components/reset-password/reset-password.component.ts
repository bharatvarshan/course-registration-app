import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  verified: boolean = true;
  ngOnInit(): void {}

  triggerOTP(phone: string) {
    console.log(phone);

    this.authService.sendOTP(phone).subscribe(
      async (response) => {
        console.log(phone);

        console.log(await response);
        this.notificationService.notifier.notify('success', 'OTP Sent');
      },
      (err) => {
        this.notificationService.notifier.notify('error', err);
      }
    );
  }

  onSubmit(form: NgForm) {}
}
