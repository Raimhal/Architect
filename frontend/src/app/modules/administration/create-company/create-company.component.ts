import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { INewCompanyDto } from '../resources/DTOmodels/new-company-dto.model';
import * as AdminActions from '../state/administration.actions';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompany implements OnInit {
  @Input() NewCompanyId: number = 0;
  company: INewCompanyDto;

  addressFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new CreateCompanyErrorStateMatcher();
  constructor(private state: Store<AppState>,
              public dialogRef: MatDialogRef<CreateCompany>) {
    this.company = {
      companyid: this.NewCompanyId,
      address: '',
      city: '',
      country: '',
      email: '',
      companyname: ''
    }
  }

  ngOnInit(): void {

  }

  Submit(): void {
    if (this.nameFormControl.errors != null) {
      alert("Company name is required.");
      return;
    }
    if (this.emailFormControl.errors != null) {
      alert("Please, enter right email.");
      return;
    }
    if (this.countryFormControl.errors != null) {
      alert("Country is required.");
      return;
    }
    if (this.cityFormControl.errors != null) {
      alert("City is required.");
      return
    }
    if (this.addressFormControl.errors != null) {
      alert("Address is required.");
      return;
    }

    // Send it to effects, that must send request to server
    this.state.dispatch(AdminActions.CreateCompany({ date: this.company }));
  }


  close() {
    this.dialogRef.close()
  }
}

export class CreateCompanyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

