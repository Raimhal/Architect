import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { AppState } from './store';
import { login } from './store/actions/auth.actions';
import {Observable} from "rxjs";
import {selectIsLoggedIn} from "./store/selectors/auth.selectors";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  userIsLoggedIn$? : Observable<boolean>

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    //this.store.dispatch(login({ email: 'test@test', password: 'test' }))
    this.userIsLoggedIn$ = this.store.pipe(select(selectIsLoggedIn))
  }
}
