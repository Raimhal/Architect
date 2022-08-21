import { HttpClient } from '@angular/common/http';

export class ApiService {
  baseUrl: string = 'https://localhost:7271/api';

  constructor(
    protected http: HttpClient
  ) {}


  get<T>(path: string) {
    return this.http.get<T>(`${this.baseUrl}${path}`);
  }
  post<T>(path:string, data: any){
    return this.http.post<T>(`${this.baseUrl}${path}`, data);
  }
  put<T>(path:string, data: any){
    return this.http.put<T>(`${this.baseUrl}${path}`, data);
  }
}
