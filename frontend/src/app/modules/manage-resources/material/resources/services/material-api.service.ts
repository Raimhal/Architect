import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ApiService} from "../../../../../core/resources/services/api.service";
import {Params} from "@angular/router";
import {Observable} from "rxjs";
import {PaginationModel} from "../../../../../shared/models/pagination-model";
import {IMaterial} from "../models/material-dto";
import {IMaterialType} from "../models/material-type-dto";
import {IMeasurement} from "../models/measurement-dto";

@Injectable({providedIn: 'root'})
export class MaterialApiService extends ApiService {
  apiPath = "/Resource";

  constructor(http: HttpClient) {
    super(http);
  }


  getMaterialWithParams(params: Partial<Params>): Observable<PaginationModel<IMaterial>> {
    return this.getWithOptions<PaginationModel<IMaterial>>(`${this.apiPath}/materials`, {params: params});
  }

  getMaterialType(): Observable<IMaterialType[]> {
    return this.get<IMaterialType[]>(`${this.apiPath}/get-material-type`);
  }

  getMeasurement(): Observable<IMeasurement[]> {
    return this.get<IMeasurement[]>(`${this.apiPath}/get-measurement`);
  }
}
