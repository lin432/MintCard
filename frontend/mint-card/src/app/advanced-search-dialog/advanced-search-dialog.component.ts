import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SearchProperties} from '../card/models/search.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../core/reducers/index.reducer';
import * as fromCards from '../card/actions/card.actions';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-advanced-search-dialog',
  templateUrl: './advanced-search-dialog.component.html',
  styleUrls: ['./advanced-search-dialog.component.scss']
})
export class AdvancedSearchDialogComponent implements OnInit {
  // @Input() dialogRef: MatDialogRef<AdvancedSearchDialogComponent>;
  private operatorString = 'Search';
  properties: SearchProperties;
  colors: string[] = [];
  @ViewChild('name') name: ElementRef;
  @ViewChild('type') type: ElementRef;
  @ViewChild('text') text: ElementRef;
  @ViewChild('uuid') uuid: ElementRef;
  @ViewChild('power') power: ElementRef;
  @ViewChild('toughness') toughness: ElementRef;
  @ViewChild('types') types: ElementRef;
  @ViewChild('supertypes') supertypes: ElementRef;
  @ViewChild('subtypes') subtypes: ElementRef;
  constructor(private store: Store<fromRoot.State>, private dialogRef: MatDialogRef<AdvancedSearchDialogComponent>) { }

  ngOnInit(): void {
  }

  toggleColor(name: string, e): void {
    const index = this.colors.indexOf(name);
    if (e.checked) {
      if (index < 0) {
        this.colors.push(name);
      }
    } else {
      if (index > -1) {
        this.colors.splice(index, 1);
      }
    }
  }


  dispatchSearchAdvanced(): void {
    let name;
    let type;
    let text;
    let uuid;
    let power;
    let toughness;
    let colors;
    if (this.name.nativeElement.value.length > 0) {
      name = this.name.nativeElement.value;
    }
    if (this.type.nativeElement.value.length > 0) {
      type = this.type.nativeElement.value;
    }
    if (this.text.nativeElement.value.length > 0) {
      text = this.text.nativeElement.value;
    }
    if (this.uuid.nativeElement.value.length > 0) {
      uuid = this.type.nativeElement.value;
    }
    if (this.power.nativeElement.value.length > 0) {
      power = this.power.nativeElement.value;
    }
    if (this.toughness.nativeElement.value.length > 0) {
      toughness = this.toughness.nativeElement.value;
    }
    if (this.colors.length > 0) {
      colors = this.colors;
    }
    let types = this.types.nativeElement.value.split(',');
    if (types.length === 1 && types[0] === '') {
      types = undefined;
    } else if (types.length === 0) {
      types = undefined;
    }
    let supertypes = this.supertypes.nativeElement.value.split(',');
    if (supertypes.length === 1 && supertypes[0] === '') {
      supertypes = undefined;
    } else if (supertypes.length > 0) {
      supertypes = undefined;
    }
    let subtypes = this.subtypes.nativeElement.value.split(',');
    if (subtypes.length === 1 && subtypes[0] === '') {
      subtypes = undefined;
    } else if (subtypes.length > 0) {
      subtypes = undefined;
    }
    this.properties = {
      name,
      type,
      text,
      uuid,
      power,
      toughness,
      colors,
      types,
      supertypes,
      subtypes
    };
//     this.properties.name = this.name.nativeElement.value;
//     this.properties.type = this.type.nativeElement.value;
//     this.properties.text = this.text.nativeElement.value;
//     this.properties.uuid = this.uuid.nativeElement.value;
//     this.properties.colors = this.colors.slice();
//     this.properties.types = this.types.nativeElement.value.split(',');
//     this.properties.supertypes = this.supertypes.nativeElement.value.split(',');
//     this.properties.subtypes = this.subtypes.nativeElement.value.split(',');
    console.log(this.properties);
    this.store.dispatch(new fromCards.SearchAdvanced(this.properties, this.operatorString));
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
