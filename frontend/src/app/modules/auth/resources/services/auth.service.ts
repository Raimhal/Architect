import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/resources/services/api.service';
import { AuthModule } from '../../auth.module';
import ForgotPasswordDTO from '../models/resetPasswordDTO';

@Injectable({
  // providedIn: AuthModule,
   providedIn: "root",
})
export class AuthService extends ApiService {
  authapi=`${this.baseUrl}/auth`
  constructor(
    http: HttpClient
  ) {
    super(http);
  }
  resetPassword(resetPasswordDTO:ForgotPasswordDTO) {
   return this.http.post(`${this.authapi}/forgotPassword`,resetPasswordDTO);
  }
}
