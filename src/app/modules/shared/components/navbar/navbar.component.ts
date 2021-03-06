import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin!: boolean;
  isLoggedIn!: boolean;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.userId = localStorage.getItem('User_ID') || '{}';
    this.isAdmin = this.authService.isAdmin;
    this.isLoggedIn = this.authService.isLoggedIn == 'yes' ? true : false;
  }
  userId!: string;
  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('Role');
    localStorage.removeItem('User_ID');
    localStorage.removeItem('Token');
    localStorage.removeItem('Login_Status');

    localStorage.clear();
    this.notificationService.notifier.notify(
      'success',
      'Logged out Successfully'
    );
    this.router.navigate(['/users/login']);
  }
}
