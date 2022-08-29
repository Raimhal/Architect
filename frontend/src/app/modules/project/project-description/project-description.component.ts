import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppState } from 'src/app/store';
import { openModalDialog } from 'src/app/store/actions/modal-dialog.action';
import { AddProjectPhotosComponent } from '../add-project-photos/add-project-photos.component';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { FormControlState, FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { IProjectDetailed } from '../resources/models/project-details';
import { cancelEditProjectInformationForm, editProjectInformationForm, getDetailedProject, submitProjectInformationForm } from '../state/project.actions';
import { selectProjectInformation, selectProjectInformationForm } from '../state/project.selectors';
import * as fromProjectInformationForm from '../resources/forms/project-information-form';
import { IProjectUpdate } from '../resources/models/project-update';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {

  project$?: Observable<IProjectDetailed>
  projectInformationForm$?: Observable<
    FormGroupState<fromProjectInformationForm.ProjectInformationFormValue>
  >;

  isEditEnabled = false

  constructor(
    private store: Store<AppState>,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    iconRegistry.addSvgIcon(
      'pencil',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pencil.svg')
    );
    iconRegistry.addSvgIcon(
      'plus',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus.svg')
    );
  }

  addPhotosModal(id: number) {
    this.store.dispatch(
      openModalDialog({
        component: AddProjectPhotosComponent, config: {
          data: id
        }
      }))
    this.projectInformationForm$ = this.store.pipe(
      select(selectProjectInformationForm)
    );
  }

  changeEdit(event: Event) {
    event.preventDefault()
    this.isEditEnabled = !this.isEditEnabled
  }


  onFormEdit() {
    this.isEditEnabled = true;
    this.store.dispatch((editProjectInformationForm()));
  }

  onCancel() {
    this.isEditEnabled = false;
    this.store.dispatch(cancelEditProjectInformationForm());
  }
  
  ngOnInit(): void { 
    const id = this.route.snapshot.params["id"]
    this.store.dispatch(getDetailedProject(id))
  }

  onSave(id: number, form: fromProjectInformationForm.ProjectInformationFormValue) {
    this.isEditEnabled = false;
    console.log(form)
    this.store.dispatch(
      submitProjectInformationForm({
        id: id,
        address: form.address,
        startTime: form.startTime,
        endTime: form.endTime
      } as IProjectUpdate)
    );
  }
}
