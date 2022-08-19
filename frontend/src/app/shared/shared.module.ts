import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CloseButtonComponent } from './components/buttons/close-button/close-button.component';
import { BackButtonComponent } from './components/buttons/back-button/back-button.component';
import { InputComponent } from './components/inputs/input/input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { ButtonComponent } from './components/buttons/button/button.component';
import {MatButtonModule} from '@angular/material/button';
import { LargeButtonComponent } from './components/buttons/large-button/large-button.component';
import { MiniButtonComponent } from './components/buttons/mini-button/mini-button.component';
import { ForgotPasswordButtonComponent } from './components/buttons/forgot-password-button/forgot-password-button.component';
import { FilterComponent } from './components/buttons/filter/filter.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CloseButtonComponent,
    BackButtonComponent,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    LargeButtonComponent,
    MiniButtonComponent,
    ForgotPasswordButtonComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule
  ],
  exports: [
    CloseButtonComponent,
    BackButtonComponent,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    LargeButtonComponent,
    MiniButtonComponent,
    ForgotPasswordButtonComponent,
    FilterComponent,
  ],
})
export class SharedModule {}
