import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { map } from 'rxjs';
import { hideMenu, openMenu } from "../../../store/actions/menu.actions";
import { UserRole } from "../../auth/resources/models/userRole";
import { ActivatedRoute } from "@angular/router";
import * as fromAuthSelectors from "../../../store/selectors/auth.selectors";
import * as fromProjectSelectors from "../state/project.selectors";
import * as fromProjectActions from "../state/project.actions";
import * as fromRouteActions from "../../../store/actions/route.actions";
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { IProjectDetailed } from '../resources/models/project-details';
import { getDetailedProject } from '../state/project.actions';
import { selectProjectInformation } from '../state/project.selectors';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  canChangeStatus$ = this.store.select(fromAuthSelectors.selectUserRole).pipe(
    map(role => role === UserRole.OperationalManager || role === UserRole.ProjectManager)
  );

  project$?: Observable<IProjectDetailed>

  currentStatus$ = this.store.select(fromProjectSelectors.selectCurrentProjectStatus);
  selectedStatus: number = 0;

  currentProjectId = 0;

  statuses = [
    'Not Started',
    'In Progress',
    'Suspended',
    'Finished',
  ];

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private store: Store<AppState>,
    private route: ActivatedRoute) {

    this.currentProjectId = parseInt(this.route.snapshot.paramMap.get('id')!);

    iconRegistry.addSvgIcon(
      'arrow-left',
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/arrow_left.svg")
    );
  }

  ngOnInit(): void {
    this.store.dispatch(getDetailedProject({ id: this.currentProjectId }))
    this.project$ = this.store.pipe(select(selectProjectInformation))
    this.store.dispatch(openMenu());
    this.store.dispatch(hideMenu());
  }

  changeStatus(newStatus: number) {
    this.store.dispatch(fromProjectActions.changeProjectStatus({ projectId: this.currentProjectId, newStatus }))
  }

  goToProjects() {
    this.store.dispatch(fromRouteActions.navigate({ commands: ['projects'] }));
  }
}
