import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/resources/services/api.service";
@Injectable({
  providedIn: "root",
})
export class ProjectService extends ApiService {
  ApiPath: string = `${this.baseUrl}/projects`;

  constructor(http: HttpClient) {
    super(http);
  }
}