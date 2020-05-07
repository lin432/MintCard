import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Card } from '../card/models/card.model';
import { Dictionary } from '@ngrx/entity';
import { CardDictEntry } from './card-list.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() cards: Dictionary<CardDictEntry>;
  @Input() simple: boolean;
  @Input() disabled: boolean;
  @Output() cardChange = new EventEmitter<CardDictEntry>();
  @ViewChild('cardzone') cardzone !: ElementRef;
  positions = {};
  cardWidth = 148;
  width = 1;
  row = 0;
  num = 0;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // Get width by using nativeElement
    if (this.cardzone && this.cardzone.nativeElement) {
      this.width = Math.floor(this.cardzone.nativeElement.clientWidth / this.cardWidth);
    }
    if (this.cards) {
      this.arrangeCards(Object.keys(this.cards));
      // // Clean old positions
      // Object.keys(this.positions).forEach(id => {
      //   if (!this.cards[id] || this.cards[id] === undefined) {
      //     delete this.positions[id];
      //   }
      // });

      // Setup new positions
      Object.keys(this.cards).forEach(id => {
        if (!this.positions[id] || this.positions[id] === undefined) {
          this.newCardLocation(id);
        }
      });
    }
  }

  getKeys() {
    return this.cards ? Object.keys(this.cards) : [];
  }

  update(event, card) {
    this.cards[card].amount = event;

    this.cardChange.emit(this.cards[card]);

    if (this.cards[card].amount < 1) {
      delete this.cards[card];
    }
  }

  arrangeCards(cardsIds: string[]) {
    let num = 0;
    let row = 0;
    cardsIds.forEach(id => {
      this.setCardLocation(id, row, this.width);

      num++;
      if (num + 1 > this.width) {
        num = 0;
        row++;
      }
    });

    this.row = row;
    this.num = num;
  }

  setCardLocation(id: string, row, width) {
    const heightGap = 240;

    this.positions[id] = {
      x: 0 - (row * this.cardWidth * width),
      y: row * heightGap
    };
  }

  newCardLocation(id: string) {
    if (!this.positions[id] || this.positions[id] === undefined) {
      this.positions[id] = { x: 0, y: 0 };
    }

    this.setCardLocation(id, this.row, this.width);
    this.num++;
    if (this.num + 1 > this.width) {
      this.num = 0;
      this.row++;
    }
  }

}
