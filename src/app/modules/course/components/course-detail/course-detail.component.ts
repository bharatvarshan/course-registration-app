import { Component, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.model';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { Courses } from '../../../shared/models/course.model';
import { CourseService } from '../../services/course.service';

declare var Razorpay: any;
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course!: Courses;
  user!: User;
  courseId!: string;
  userId!: string;
  userEnrollments!: string[];
  isEnrolled!: boolean;
  isCalled: boolean = false;
  options!: any;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private userService: UserService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('User_ID') || '{}';
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
      console.log(this.courseId);
    });
    this.userService.getUser(this.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        console.log(response);
      },
    });
    this.courseService.getCourse(this.courseId).subscribe({
      next: (response: any) => {
        this.course = response;
        console.log(response);
      },
    });

    this.courseService.getUserEnrollments(this.userId).subscribe({
      next: (response: any) => {
        this.userEnrollments = response;
        this.isEnrolled = response.some((id: any) => id == this.courseId);
        console.log(this.isEnrolled);
      },
    });
  }

  onSubmit(form: NgForm) {
    this.courseService.enrollCourse(this.userId, this.courseId).subscribe({
      next: (response: any) => {
        // this.notificationService.notifier.notify(
        //   'success',
        //   'Payment Successful! Course Enrolled Successfully'
        // );
        this.zone.run(() => {
          this.router.navigate(['/users/my-enrollments']);
        });
      },
    });
  }

  makePayment(form: NgForm) {
    const body = {
      price: this.course.price,
    };
    let response;

    this.courseService.makePayment(body).subscribe({
      next: (res: any) => {
        console.log('code is here');

        console.log(res);
        this.options = {
          key: 'rzp_test_yyPJDNR7iPgM94',
          amount: 30000,
          currency: 'INR',
          name: 'Pro Academy',
          description: this.course.courseName,
          order_id: res.id,
          handler: (response: any) => {
            console.log(response);
            // this.isLoaded = false;
            const paymentbody = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
            };
            // console.log('inga ');
            // this.notificationService.notifier.notify(
            //   'success',
            //   'Payment Successful'
            // );
            // if (!this.isCalled) {
            //   this.onSubmit(form);
            //   this.isCalled = true;
            // }

            this.courseService.verifySignature(paymentbody).subscribe({
              next: (res) => {
                console.log(res);

                if (res == 'Verified') {
                  this.notificationService.notifier.notify(
                    'success',
                    'Payment Successful! Course Enrolled Successfully'
                  );
                  if (!this.isCalled) {
                    this.onSubmit(form);
                    this.isCalled = true;
                  }
                }
              },
              error: (err) => {
                this.notificationService.notifier.notify(
                  'error',
                  'Payment Verification Failed'
                );
              },
              // complete: () => {
              //   this.isLoaded = true;
              // },
            });
          },
          prefill: {
            name: this.user.name,
            email: this.user.email,
            contact: '9703681102',
          },
          theme: {
            color: '#f05a28',
          },
        };

        var rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', this.paymentFailureHandler);
        console.log('failed');
      },
      error: (err) => {
        this.paymentFailureHandler;
        console.log('failed');
      },
    });
  }

  paymentFailureHandler() {
    this.notificationService.notifier.notify(
      'error',
      'unexpected error orrucred during payment please try again'
    );
  }

  navigateToEnrollments() {
    this.router.navigate(['/users/my-enrollments']);
  }
}
