import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";

export class ApiService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  get<T>(path: string) {
    return this.http.get<T>(`${this.baseUrl}${path}`);
  }

  post<T>(path: string, data: any) {
    return this.http.post<T>(`${this.baseUrl}${path}`, data);
  }

  put<T>(path: string, body: any | null) {
    return this.http.put<T>(`${this.baseUrl}${path}`, body);
  }

  putWithOptions<T>(path: string, body: any | null, options?: any) {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, options);
  }
}
