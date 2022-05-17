import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  userId!: string;
  ngOnInit(): void {
    this.userId = localStorage.getItem('User_ID') || '{}';
  }

  logout() {
    localStorage.removeItem('Role');
    localStorage.removeItem('User_ID');

    localStorage.clear();
    this.notificationService.notifier.notify(
      'success',
      'Logged out Successfully'
    );
    this.router.navigate(['/users/login']);
  }
}
