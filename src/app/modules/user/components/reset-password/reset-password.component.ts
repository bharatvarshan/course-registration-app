import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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
    private notificationService: NotificationService,
    private router: Router
  ) {}
  verified: boolean = false;
  sessionData!: any;
  sessionID!: string;
  verifyData = {
    id: '',
    otp: '',
  };
  verifyResponse!: any;
  ngOnInit(): void {}

  triggerOTP() {
    // console.log(phone);

    this.authService.sendOTP().subscribe(
      async (response) => {
        // console.log(phone);

        this.sessionData = response;
        this.sessionID = this.sessionData.sessionCode;
        console.log(this.sessionID);

        this.notificationService.notifier.notify('success', 'OTP Sent');
      },
      (err) => {
        console.log(err);

        this.notificationService.notifier.notify('error', `error: ${err}`);
      }
    );
  }

  verifyOTP(otp: string) {
    this.verifyData.id = this.sessionID;
    this.verifyData.otp = otp;
    console.log(this.verifyData);
    if (this.sessionID != undefined || otp != '') {
      this.authService.verifyOTP(this.verifyData).subscribe(
        async (response) => {
          this.verifyResponse = response;
          console.log(this.verifyResponse.message);
          if (this.verifyResponse.message == 'OTP Matched') {
            this.verified = true;
            this.notificationService.notifier.notify(
              'success',
              'OTP Verified Successfully'
            );
          } else {
            this.notificationService.notifier.notify(
              'error',
              'Invalid OTP, Retry again'
            );
          }
        },
        (err) => {
          console.log(err);

          this.notificationService.notifier.notify('error', `error: ${err}`);
        }
      );
    } else {
      this.notificationService.notifier.notify('error', 'Resend OTP');
    }
  }

  onSubmit(form: NgForm) {
    if (this.verified) {
      this.authService.resetPassword(form.value).subscribe(
        (response) => {
          console.log(response);
          this.notificationService.notifier.notify(
            'success',
            'Password Changed Successfully'
          );

          this.router.navigate(['/users/login']);
        },
        (err) => {
          this.notificationService.notifier.notify('error', err);
          console.log(err);
        }
      );
    } else {
      this.notificationService.notifier.notify('error', 'OTP not verified');
    }
  }
}
