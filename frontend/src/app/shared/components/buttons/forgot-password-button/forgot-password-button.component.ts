import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-button',
  templateUrl: './forgot-password-button.component.html',
  styleUrls: ['./forgot-password-button.component.scss']
})
export class ForgotPasswordButtonComponent implements OnInit {

  @Input() routerLink: string = ""

  text: string = "Forgot password"

  constructor() { }

  ngOnInit(): void {
  }

}
