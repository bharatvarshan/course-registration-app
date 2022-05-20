import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {}

  expiry!: number;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/auth/refreshtoken') > -1) {
      return next.handle(request);
    }
    const token = localStorage.getItem('Token');

    if (token) {
      this.expiry = this.jwtHelper.decodeToken(token).exp;
      if (Date.now() < this.expiry * 1000) {
        const transformedRequest = request.clone({
          setHeaders: {
            secret_token: token,
          },
        });
        return next.handle(transformedRequest);
      }
      const payload = {
        refresh_token: localStorage.getItem('Refresh_Token'),
        userId: localStorage.getItem('User_ID'),
      };

      return this.authService.callRefershToken(payload).pipe(
        switchMap((newTokens: any) => {
          localStorage.setItem('Token', newTokens.access_token);
          localStorage.setItem('Refresh_Token', newTokens.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(
            newTokens.access_token
          );
          this.expiry = decodedUser.exp;
          // localStorage.setItem('expiration', decodedUser.exp);
          // this.authService.userInfo.next(decodedUser);
          const transformedRequest = request.clone({
            setHeaders: {
              secret_token: newTokens.access_token,
            },
          });
          return next.handle(transformedRequest);
        })
      );
    } else {
      return next.handle(request).pipe(
        catchError((err) => {
          if (err.status === 401) {
            // alert('Your Token has expired or invalid');
            localStorage.clear();
            this.notificationService.notifier.notify(
              'error',
              'Your session has expired! Please login again'
            );
            this.router.navigate(['/users/login']);
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        })
      );
    }
  }
}
