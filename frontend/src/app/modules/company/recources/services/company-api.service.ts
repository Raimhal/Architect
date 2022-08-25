import {Injectable} from '@angular/core';
import {ApiService} from "../../../../core/resources/services/api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICompanyProfile} from "../models/company-profile";
import {Params} from "@angular/router";
import {PaginationModel} from "../../../../shared/models/pagination-model";
import {IProjectOverview} from "../models/project-overview";

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService extends ApiService {

  apiUrl = "/companies";

  constructor(http: HttpClient) {
    super(http);
  }

  getCompanyProfile(userId: number): Observable<ICompanyProfile> {
    return this.get<ICompanyProfile>(`${this.apiUrl}/get-by-user-id/${userId}`);
  }

  getProjectsByCompanyId(
    id: number
  ): Observable<IProjectOverview[]> {
    return this.get<IProjectOverview[]>(`/projects/company/${id}`);
  }
}