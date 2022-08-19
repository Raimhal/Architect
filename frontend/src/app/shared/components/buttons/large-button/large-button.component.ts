import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-large-button',
  templateUrl: './large-button.component.html',
  styleUrls: ['./large-button.component.scss']
})
export class LargeButtonComponent implements OnInit {

  @Input() disabled = false

  constructor() { }

  ngOnInit(): void {
  }

}
