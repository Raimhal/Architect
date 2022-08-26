import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { ICompanyDetailed } from '../resources/models/company-detailed.model';
import * as AdministrationSelectors from '../state/administration.selectors';
import * as fromAdministrationActions from '../state/administration.actions';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AddCompanyMemberComponent } from '../add-company-member/add-company-member.component';
import { FormGroupState } from 'ngrx-forms';
import * as fromCompanyInformationForm from '../resources/forms/company-information-form';
import {
  hideMenu,
  openMenu,
  revealMenu,
} from '../../../store/actions/menu.actions';
import { openModalDialog } from '../../../store/actions/modal-dialog.action';
import { ActivatedRoute } from '@angular/router';

import {
  loadMembersToOpenCompany,
  uploadFileSuccess
} from "../state/administration.actions";
import {AdministrationFileService} from "../resources/services/administration-file.service";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss'],
})
export class CompanyInformationComponent implements OnInit {
  companyDetailed$?: Observable<ICompanyDetailed | null>;
  companyInformationForm$?: Observable<
    FormGroupState<fromCompanyInformationForm.CompanyInformationFormValue>
  >;
  isEditEnabled$?: Observable<boolean>;
  companyId?: number;
  constructor(
    private store: Store<AppState>,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fileService: AdministrationFileService,
    private activatedRoute: ActivatedRoute
  ) {
    this.store.dispatch(openMenu());
    this.store.dispatch(hideMenu());
  }

  ngOnInit(): void {
    this.setId();
    if (this.companyId) {
      this.store.dispatch(
        fromAdministrationActions.loadDetailedCompany({ id: this.companyId })
      );
    }

    this.companyDetailed$ = this.store.pipe(
      select(AdministrationSelectors.selectCurrentlyOpenCompany)
    );

    this.companyInformationForm$ = this.store.pipe(
      select(AdministrationSelectors.selectCompanyInformationForm)
    );
    
    this.isEditEnabled$ = this.store.pipe(select(AdministrationSelectors.selectFormEnabled))
    
    this.addSvgIcons();
  }
  setId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) this.companyId = parseInt(id);
  }

  onFormEdit() {
    this.store.dispatch(fromAdministrationActions.editCompanyInformationForm());
  }

  onSave(address: string, email: string) {
    this.store.dispatch(
      fromAdministrationActions.submitCompanyInformationForm({
        address: address,
        email: email,
      })
    );
  }

  onCancel() {
    this.store.dispatch(
      fromAdministrationActions.cancelEditCompanyInformationForm()
    );
  }

  uploadImage(id: number, event: Event) {
    // const target = event.target as HTMLInputElement;
    // if (target.files !== null) {
    // 	const file = target.files[0];
    // 	this.store.dispatch(
    // 		fromAdministrationActions.UploadCompanyImage({ id: id, image: file })
    // 	);
    // }
  }

  addSvgIcons() {
    this.matIconRegistry.addSvgIcon(
      'arrow_left',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/arrow_left.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'pencil',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/pencil.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'file_plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/file_plus.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
  }

  openModal(companyId: number) {
    this.store.dispatch(
      openModalDialog({
        component: AddCompanyMemberComponent,
        config: {
          data: companyId,
        },
      })
    );
  }

  @ViewChild('hiddenfileinput') hiddenFileInput?: ElementRef
  async onFileSelect(files:FileList|null, companyId: number) {
    if (files) {
      let selectedFile = files[0];
      let result = await this.fileService.postNewMembers({companyId: companyId, file: selectedFile})
      this.store.dispatch(uploadFileSuccess({errorLines:result, companyId:companyId}));
      this.companyInformationForm$ = this.store.pipe(
        select(AdministrationSelectors.selectCompanyInformationForm)
      );
      this.hiddenFileInput!.nativeElement.value="";
    }
  }
}
