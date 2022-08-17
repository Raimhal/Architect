import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-page-layout',
  templateUrl: './auth-page-layout.component.html',
  styleUrls: ['./auth-page-layout.component.scss']
})
export class AuthPageLayoutComponent {

  constructor(private router: Router) {
  }

  goBack() {
    return this.router.navigate(['..']);
  }
}
