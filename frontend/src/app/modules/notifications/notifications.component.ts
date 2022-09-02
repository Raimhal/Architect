import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { INotification } from './resources/models/notification.model';
import * as fromNotificationsSelectors from '../../store/selectors/notif.selector';
import { Observable } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<INotification[]>;
  notifCount$: Observable<number>;

  constructor(private state: Store<AppState>, private notiService: NotificationService) {
    this.notifications$ = this.state.pipe(select(fromNotificationsSelectors.selectNotificationsList));
    this.notifCount$ = this.state.pipe(select(fromNotificationsSelectors.selectNotificationsCount));
  }

  ngOnInit(): void {
  }

  deleteAllNotifi(): void {

  }

  deleteNotifi(id: number): void {
    this.notiService.deleteNotif(id);
  }
}
