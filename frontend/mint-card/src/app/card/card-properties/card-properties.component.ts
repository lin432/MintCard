import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../models/card.model';

export interface CardDialogData {
  image: string;
  card: Card;
}

@Component({
  selector: 'app-card-properties',
  templateUrl: './card-properties.component.html',
  styleUrls: ['./card-properties.component.scss']
})
export class CardPropertiesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CardPropertiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
