import { Component, OnInit } from '@angular/core';
import {IMember} from "../resources/models/member.model";
import {addNewMember} from "../state/administration.actions";
import {Store} from "@ngrx/store";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-company-member',
  templateUrl: './add-company-member.component.html',
  styleUrls: ['./add-company-member.component.scss']
})
export class AddCompanyMemberComponent implements OnInit {

  newMember: IMember

  constructor(private store:Store,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private dialogRef: MatDialogRef<AddCompanyMemberComponent>) {
    this.newMember = {} as IMember;
    this.matIconRegistry.addSvgIcon(
      'cross',
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/Cross.svg")
    );
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if(this.newMember.position!=null
    && this.newMember.email!=null
    && this.newMember.firstName!=null
    && this.newMember.lastName!=null){
      this.store.dispatch(addNewMember({data:this.newMember}));
    }
  }

}
