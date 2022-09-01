import { Injectable } from '@angular/core';
import {ApiService} from "../../../../core/resources/services/api.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBuilding} from "../models/building.model";
import { AvailableMaterial } from '../models/project-material/available-material.model';
import { RequiredMaterial } from '../models/project-material/required-material.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceApiService extends ApiService {

  apiPath = '/Resource'

  constructor(http: HttpClient) {
    super(http);
  }

  getAvailableMaterials(filter: string | null) : Observable<AvailableMaterial[]> {
    return this.get<AvailableMaterial[]>(`${this.apiPath}/available-materials?filter=${filter ?? ''}`);
  }

  saveRequiredMaterials(materials: RequiredMaterial[]) : Observable<void> {
    return this.post<void>(`${this.apiPath}/save-required`, materials);
  }
}