import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import { selectIsLoggedIn } from "./store/selectors/auth.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  userIsLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));

  constructor(private store: Store<AppState>) {
  }

}
