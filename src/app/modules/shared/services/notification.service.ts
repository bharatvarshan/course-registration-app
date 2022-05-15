import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }
}
