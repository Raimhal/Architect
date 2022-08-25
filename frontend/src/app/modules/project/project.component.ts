import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardInformation } from 'src/app/shared/components/card/card.component';
import { AppState } from 'src/app/store';
import { IProjectOverview } from './resources/models/project-overview';
import { ProjectStatus } from './resources/models/status';
import { changeParams, getProjectsWithParams } from './resources/state/project.actions';
import { selectProjects } from './resources/state/project.selectors';
import {openMenu, revealMenu} from "../../store/actions/menu.actions";
import { openModalDialog } from 'src/app/store/actions/modal-dialog.action';
import { AddProjectComponent } from './add-project/add-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects$: Observable<IProjectOverview[]>

  status = ProjectStatus

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.projects$ = this.store.pipe(select(selectProjects));
    this.store.dispatch(openMenu());
    this.store.dispatch(revealMenu());
   }

  ngOnInit() {
    this.store.dispatch(getProjectsWithParams());
  }

  changeStatus(status: ProjectStatus) {
    this.store.dispatch(changeParams({
      params: {
        status: status
      }
    }))
  }

  getCardInformation(project: IProjectOverview): CardInformation{
    var completedPhases = project.phases.filter(p => p.isFinished)
    return {
      id: project.id,
      title: project.projectName,
      // image: project.image,
      image: 'https://res.cloudinary.com/hlsg8sz6b/image/upload/v1654073701/images/2d6ea765-57e4-474c-8a90-221f2f0d0f06.jpg',
      date: `${project.startTime}-${project.endTime}`,
      subtitle: 'last stage title',
      status: project.status,
      statusBarLabel: completedPhases[completedPhases.length - 1].phaseName,
      statusBarProgress: completedPhases.length,
      statusBarFull: project.phases.length
    }
  }

  add() {
    this.store.dispatch(openModalDialog({ component: AddProjectComponent }));
  }
}
