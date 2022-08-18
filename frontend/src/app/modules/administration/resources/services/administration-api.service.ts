import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/resources/services/api.service';
import { IMember } from '../models/member.model';
import { Observable, of } from 'rxjs';
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
    return this.http.put(this.ApiPath, date, { observe: 'response' });
  }

  getDetailedCompany(id: number): Observable<ICompanyDetailed> {
    return this.get<ICompanyDetailed>(
      `${this.ApiPath}\\getCompanyDetailed\\${id}`
    );
  }

  postCompanyImage(id: Number, image: File): Observable<string> {
    return this.post<string>(`${this.ApiPath}\\postCompanyImage\\${id}`, image);
  }
}
