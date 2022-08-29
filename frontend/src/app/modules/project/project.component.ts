import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { CardInformation } from 'src/app/shared/components/card/card.component';
import { AppState } from 'src/app/store';
import { IProjectOverview } from './resources/models/project-overview';
import { ProjectStatus } from './resources/models/status';
import { changeParams, getDetailedProject, getProjectsWithParams } from './state/project.actions';
import { selectProjects } from './state/project.selectors';
import {openMenu, revealMenu} from "../../store/actions/menu.actions";
import { openModalDialog } from 'src/app/store/actions/modal-dialog.action';
import { AddProjectComponent } from './add-project/add-project.component';
import { Order } from './resources/models/order';
import { navigate } from 'src/app/store/actions/route.actions';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projects$: Observable<IProjectOverview[]>
  contains: string
  status = ProjectStatus

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.contains = "";
    this.projects$ = this.store.pipe(select(selectProjects));
    this.store.dispatch(openMenu());
    this.store.dispatch(revealMenu());
   }


  ngOnInit() {
    this.store.dispatch(getProjectsWithParams());
  }

  changeStatus(event: MatTabChangeEvent) {
    console.log(event.index)
    this.store.dispatch(changeParams({
      params: {
        status: event.index + 1
      }
    }))
  }

  sortProjectsByName() {
    this.store.dispatch(changeParams({
      params: {
        sort: "ProjectName",
        order: Order.ASC
      }
    }))
  }

  sortProjectsByStartTime() {
    this.store.dispatch(changeParams({
      params: {
        sort: "StartTime",
        order: Order.ASC
      }
    }))
  }

  sortProjectsByStartTimeDesc() {
    this.store.dispatch(changeParams({
      params: {
        sort: "StartTime",
        order: Order.DESC
      }
    }))
  }

  findProjectsThatContains() {
    this.store.dispatch(changeParams({
      params: {
        query: this.contains
      }
    }))
  }

  getCardInformation(project: IProjectOverview): CardInformation{
    var completedPhases = project.phases.filter(p => p.isFinished)
    return {
      id: project.id,
      title: project.projectName,
      image: 'https://eitrawmaterials.eu/wp-content/uploads/2019/10/KAVA7.jpg',
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
  
  redirectToProjectPage(id: number) {
    this.store.dispatch(navigate({commands: [`/projects/${id}`]}))
  }

}
