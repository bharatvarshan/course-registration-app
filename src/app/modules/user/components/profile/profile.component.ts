import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/shared/models/user.model';
import { NotificationService } from 'src/app/modules/shared/services/notification.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  user!: User;
  userId!: string;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.userService.getUser(this.userId).subscribe({
      next: (response: any) => {
        this.user = response;
        console.log(response);
      },
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe({
      next: (response: any) => {
        this.notificationService.notifier.notify(
          'success',
          'Sorry to see you leave,Your account has been deleted successfully'
        );
        localStorage.clear();
        this.router.navigate(['/users/login']);
      },
    });
  }
}
