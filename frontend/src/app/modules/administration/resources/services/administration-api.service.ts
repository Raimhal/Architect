import { Injectable } from '@angular/core';
import {ApiService} from "../../../../core/resources/services/api.service";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ICompanyOverview} from "../models/company-overview.model";
import {DomSanitizer} from "@angular/platform-browser";
import {IMember} from "../models/member.model";
import { INewCompanyDto } from '../DTOmodels/new-company-dto.model';
import { ICompanyDetailed } from '../models/company-detailed.model';

@Injectable({
  providedIn: AdministrationApiService,
})
export class AdministrationApiService extends ApiService {
  ApiPath: string = '';

  constructor(http: HttpClient) {
    super(http);
  }

  postMember(data: IMember): Observable<number> {
    return this.post<number>(`/addMember`, data);
  }
  createCompany(date: INewCompanyDto): Observable<any> {
    return this.http.put(this.ApiPath, date, {observe: 'response'});
  }

  getAllCompaniesWithParameters(filter : string, sort : string) : Observable<ICompanyOverview[]>{
    let query = `/companies?sort=${sort}`;
    if (filter != ""){
      query += `&filter=${filter}`;
    }
    return this.get<ICompanyOverview[]>(query);
  }

  getDetailedCompany(id: number): Observable<ICompanyDetailed> {
    return of({ id: 1, companyName: "LBT", joinDate: "12.02.2022", country: "Denmark", address: "Lalala 8", city: "Kyiv", members: [] as IMember[]} as ICompanyDetailed)
    // return this.get<ICompanyDetailed>(
    //   `${this.ApiPath}\\getCompanyDetailed\\${id}`
    // );
  }

  postCompanyImage(id: Number, image: File): Observable<string> {
    return this.post<string>(`${this.ApiPath}\\postCompanyImage\\${id}`, image);
  }
}
