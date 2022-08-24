
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/resources/services/api.service";
import { PaginationModel } from "src/app/shared/models/pagination-model";
import { Order } from "../models/order";
import { IProjectOverview } from "../models/project-overview";

@Injectable({
  providedIn: "root",
})

export class ProjectService extends ApiService {
  ApiPath: string = `/projects`;

  constructor(http: HttpClient) {
    super(http);
  }

  getProjectsWithParams(
    params: Params
  ): Observable<PaginationModel<IProjectOverview>> {
    console.log(params)
    return this.getWithOptions<PaginationModel<IProjectOverview>>(this.ApiPath, {
      params: params
    });
  }
}