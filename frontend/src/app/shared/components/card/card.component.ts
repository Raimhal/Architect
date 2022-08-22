import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface CardInformation {
  title : string;
  image : string;
  date : string;
  subtitle : string;
  id: number | null;
  status: string | null;
  statusBarLabel: string | null
  statusBarProgress: number | null;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  numOfProgressBarSections = 8;

  _dummyArray = Array.from({length: 8}).map((_, i) => i);

  @Input() cardId :number =0
  @Input() cardInformation : CardInformation = {
    title : '',
    image: '',
    date: '',
    subtitle: '',
    id: null,
    status: null,
    statusBarLabel: null,
    statusBarProgress: null
  }

  @Output() onCardClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onCardClicked.emit(this.cardId);
  }
}
