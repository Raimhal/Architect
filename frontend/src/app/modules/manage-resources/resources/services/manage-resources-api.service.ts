import {Injectable} from "@angular/core";
import {ApiService} from "../../../../core/resources/services/api.service";
import {HttpClient} from "@angular/common/http";
import {IService} from "../models/service";
import {Observable, of, tap} from "rxjs";
import {ICompanyOverview} from "../../../administration/resources/models/company-overview.model";

@Injectable({
  providedIn: 'root'
})
export class ManageResourcesApiService extends ApiService {

  apiUrl = "/resources";

  constructor(http: HttpClient) {
    super(http);
  }

  addService(service: IService): Observable<IService> {

    return this.post<IService>(`${this.apiUrl}/service/add`, service);
  }

  editService(service: IService): Observable<IService> {
    return this.put<IService>(`${this.apiUrl}/service/edit`, service);
  }

  loadServices(userId: number): Observable<IService[]> {
    return this.get<IService[]>(`${this.apiUrl}/services/by-user-id/${userId}`);
  }

  deleteService(id: number): Observable<number> {
    return this.delete<number>(`${this.apiUrl}/service/${id}/delete`);
  }

  loadTypes(): Observable<string[]>{
    return this.get<string[]>(`${this.apiUrl}/types`);
  }
  getAllServicesWithParameters(filter: string, sort: string): Observable<IService[]> {
    let query = `${this.apiUrl}/services?sort=${sort}`;
    if (filter != "") {
      query += `&filter=${filter}`;
    }
    return this.get<IService[]>(query);
  }
}


