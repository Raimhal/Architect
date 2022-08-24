import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-underlined-button',
  templateUrl: './underlined-button.component.html',
  styleUrls: ['./underlined-button.component.scss']
})
export class UnderlinedButtonComponent implements OnInit {

  @Input() routerLink?: string
  @Input() disabled = false

  constructor() { }

  ngOnInit(): void {
  }

}
