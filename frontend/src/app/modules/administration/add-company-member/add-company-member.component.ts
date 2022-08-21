import {Component, Inject, OnInit} from '@angular/core';
import {IMember} from "../resources/models/member.model";
import {addNewMember, loadRoles} from "../state/administration.actions";
import {select, Store} from "@ngrx/store";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {loginSuccess} from "../../../store/actions/auth.actions";
import {IRole} from "../resources/models/role.model";
import {selectRoles} from "../state/administration.selectors";
import {Observable} from "rxjs";


@Component({
  selector: 'app-add-company-member',
  templateUrl: './add-company-member.component.html',
  styleUrls: ['./add-company-member.component.scss']
})
export class AddCompanyMemberComponent implements OnInit {

  roles$: Observable<IRole[]|null>

  companyId: number
  form = this.fb.group({
    firstName: [''],
    lastName:[''],
    userEmail:['', Validators.email],
    roleName:['']
  })

  constructor(private store:Store,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<AddCompanyMemberComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private fb: FormBuilder) {
    this.matIconRegistry.addSvgIcon(
      'cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/Cross.svg")
    );
    this.store.dispatch(loadRoles());
    this.roles$=this.store.pipe(select(selectRoles));
    this.companyId = this.data;
  }

  ngOnInit(): void {

  }
  onSubmit() {
      this.store.dispatch(addNewMember({data:{
        ...this.form.value,
          companyId: this.companyId
        } as IMember
      }));
  }

}
