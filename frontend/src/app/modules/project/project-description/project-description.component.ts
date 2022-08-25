import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { openModalDialog } from 'src/app/store/actions/modal-dialog.action';
import { AddProjectPhotosComponent } from '../add-project-photos/add-project-photos.component';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrls: ['./project-description.component.scss'],
})
export class ProjectDescriptionComponent implements OnInit {
  @Input() projectId: number = 1;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private store: Store<AppState>
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

  addPhotosModal() {
    this.store.dispatch(
      openModalDialog({
        component: AddProjectPhotosComponent, config:{
          data: this.projectId
        }
      })
    );
  }
  ngOnInit(): void {}
}
