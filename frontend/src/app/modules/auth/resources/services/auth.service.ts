import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/resources/services/api.service';
import { AuthModule } from '../../auth.module';

@Injectable({
  providedIn: AuthModule,
})
export class AuthService extends ApiService {
  constructor(
    http: HttpClient
  ) {
    super(http);
  }
}
