import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.model';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  userId!: string;
  user!: User;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.userService.getUser(this.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        // console.log(response);
      },
    });
  }

  onSubmit(form: NgForm) {
    this.userService.editUser(form.value, this.userId).subscribe(
      (response) => {
        console.log(response);
        this.notificationService.notifier.notify(
          'success',
          'Course Updated Successfully'
        );

        this.router.navigate([`/users/profile/${this.userId}`]);
      },
      (err) => console.log(err)
    );
  }
}
