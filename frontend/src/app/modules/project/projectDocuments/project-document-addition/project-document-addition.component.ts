import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AppState } from 'src/app/store';
import { closeModalDialog } from 'src/app/store/actions/modal-dialog.action';
import { ProjectFileService } from '../../resources/services/project-file.services';
import * as fromProjectActions from '../../state/project.actions'
@Component({
  selector: 'app-project-document-addition',
  templateUrl: './project-document-addition.component.html',
  styleUrls: ['./project-document-addition.component.scss'],
})
export class ProjectDocumentAdditionComponent implements OnInit {
  files: File[] = [];
  constructor(
    private filesService: ProjectFileService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {}

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
  }

 
  submit() {
    if (this.files.length !== 0) {
      this.filesService.postDocuments(this.data, this.files).catch((error: any)=>
        this.store.dispatch(fromProjectActions.uploadProjectDocumentsFailure(error))
      );
      this.store.dispatch(closeModalDialog());
    }
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
