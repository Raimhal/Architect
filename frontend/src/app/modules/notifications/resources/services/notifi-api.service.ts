import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "../../../../core/resources/services/api.service";
import { Observable } from "rxjs";
import { INotification } from "../models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotifiApiService extends ApiService {

  apiUrl = "/notifi";

  constructor(http: HttpClient) {
    super(http);
  }

  getNotificationsForUser(userId: number): Observable<INotification[]> {
    return this.get<INotification[]>(`${this.apiUrl}/${userId}`);
  }

  deleteNotification(notifid: number) {
    return this.delete(`${this.apiUrl}/delete/${notifid}`);
  }
}
