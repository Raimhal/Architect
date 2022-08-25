import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';

export class FileService {
  baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  post<T>(path: string, formData: FormData) {
    return this.http.post<T>(`${this.baseUrl}${path}`, formData).toPromise();
  }

  put<T>(path: string, formData: FormData) {
    return this.http.put<T>(`${this.baseUrl}${path}`, formData).toPromise();
  }
}
