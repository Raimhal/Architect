import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as AdminActions from '../state/administration.actions';
import * as AdminSelectors from '../state/administration.selectors';
import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';

@Component({
  selector: 'create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompany implements OnInit {
  @Input() NewCompanyId: number = 0;
  newId$: Observable<number>;
  address = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  country = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  form = new FormGroup({
    address: this.address,
    city: this.city,
    country: this.country,
    name: this.name,
    email: this.email,
  });

  constructor(private state: Store<AppState>, public dialogRef: MatDialogRef<CreateCompany>) {
    this.newId$ = this.state.pipe(select(AdminSelectors.selectNewCompanyId));
    this.newId$.subscribe(el => this.NewCompanyId = el)
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.state.dispatch(AdminActions.CreateCompany({
      date: {
        companyid: this.NewCompanyId,
        companyname: this.name.value!,
        email: this.email.value!,
        country: this.country.value!,
        city: this.city.value!,
        address: this.address.value!,
      }
    }));
  }

  close() {
    this.dialogRef.close()
  }

  nameError() {
    if (this.name.hasError('required')) {
      return 'Name is required';
    }
    return '';
  }

  emailError() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    if (this.email.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  countryError() {
    if (this.country.hasError('required')) {
      return 'Country is required';
    }
    return '';
  }

  cityError() {
    if (this.city.hasError('required')) {
      return 'City is required';
    }
    return '';
  }

  addressError() {
    if (this.address.hasError('required')) {
      return 'Address is required';
    }
    return '';
  }
}
