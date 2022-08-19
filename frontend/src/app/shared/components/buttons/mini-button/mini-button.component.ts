import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-button',
  templateUrl: './mini-button.component.html',
  styleUrls: ['./mini-button.component.scss']
})
export class MiniButtonComponent implements OnInit {

  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
