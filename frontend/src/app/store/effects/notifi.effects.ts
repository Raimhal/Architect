import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { NotifiApiService } from "../../modules/notifications/resources/services/notifi-api.service";
import * as fromNotifiActions from '../actions/notifi.actions';

@Injectable()
export class NotificationsEffects {
  loadArticles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromNotifiActions.loadNotifis),
        mergeMap((action) =>
          this.notifiApiService.getNotificationsForUser(action.userId).pipe(
            map(
              (notifis) =>
                 fromNotifiActions.loadNotifisSuccess({
                  notifications: notifis
                })
            )
          )
        )
      ), 
  );

  constructor(private actions$: Actions, private notifiApiService: NotifiApiService) { }
}
