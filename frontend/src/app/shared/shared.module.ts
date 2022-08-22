import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CloseButtonComponent } from './components/buttons/close-button/close-button.component';
import { BackButtonComponent } from './components/buttons/back-button/back-button.component';
import { InputComponent } from './components/inputs/input/input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { ButtonComponent } from './components/buttons/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { LargeButtonComponent } from './components/buttons/large-button/large-button.component';
import { MiniButtonComponent } from './components/buttons/mini-button/mini-button.component';
import {
  ForgotPasswordButtonComponent
} from './components/buttons/forgot-password-button/forgot-password-button.component';
import { FilterComponent } from './components/buttons/filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DatepickerComponent, MY_FORMATS } from './components/inputs/datepicker/datepicker.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import {
  DatepickerHeaderComponent
} from './components/inputs/datepicker/datepicker-header/datepicker-header.component';
import { AutocompleteComponent } from './components/inputs/autocomplete/autocomplete.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";
import { DropdownComponent } from './components/inputs/dropdown/dropdown.component';
import { MatSelectModule } from "@angular/material/select";
import { TabsComponent } from './components/inputs/tabs/tabs.component';
import { MatTabsModule } from "@angular/material/tabs";
import { CardComponent } from './components/card/card.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { FilterInputComponent } from './components/inputs/filter-input/filter-input.component';
import { NotLoggedInComponent } from "./components/guards/not-logged-in/not-logged-in.component";
import { LoggedInComponent } from "./components/guards/logged-in/logged-in.component";
import { HasRoleComponent } from "./components/guards/has-role/has-role.component";


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
    DatepickerComponent,
    DatepickerHeaderComponent,
    ModalDialogComponent,
    AutocompleteComponent,
    DropdownComponent,
    TabsComponent,
    CardComponent,
    FilterInputComponent,
    LoggedInComponent,
    NotLoggedInComponent,
    HasRoleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule
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
    DatepickerComponent,
    MatMomentDateModule,
    AutocompleteComponent,
    DropdownComponent,
    TabsComponent,
    CardComponent,
    FilterInputComponent,
    LoggedInComponent,
    NotLoggedInComponent,
    HasRoleComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SharedModule {
}
