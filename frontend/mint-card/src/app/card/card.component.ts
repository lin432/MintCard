import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { CardPropertiesComponent } from './card-properties/card-properties.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() amount = 0;
  @Input() simple: boolean;
  @Input() image: string;
  @Output() amountChange = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  emitAmountChange() {
    this.amountChange.emit(this.amount);
  }

  add() {
    this.amount++;
    this.emitAmountChange();
  }
  remove() {
    this.amount--;
    this.emitAmountChange();
  }

  openCardProperties() {
    const dialog = this.dialog.open(CardPropertiesComponent,
      { width: '400px', data: {card: this.card, image: this.image} });
  }

}
