import { Component, ElementRef, OnInit, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import * as fromCards from '../card/actions/card.actions';
import * as fromCardImages from '../card/actions/card-image.actions';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../core/reducers/index.reducer';
import { OperationStatusTypes } from '../core/enums/operationStatusTypes.enum';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Card, CardDetails } from '../card/models/card.model';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { SearchProperties } from '../card/models/search.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdvancedSearchDialogComponent } from '../advanced-search-dialog/advanced-search-dialog.component';
import { CardDictEntry } from '../card-list/card-list.model';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private operatorString = 'Search';
  currentUsername = '...';
  @ViewChild('searchText') searchText: ElementRef;
  cards: Card[];
  searchElastic = false;
  detailedCard: Card = null;
  private destroyed$ = new Subject<boolean>();
  searchResults: Dictionary<CardDictEntry>;
  @Output() addEmit = new EventEmitter<Card>();
  constructor(
    private store: Store<fromRoot.State>,
    public session: SessionStorageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.pipe(select(fromRoot.getCards), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operator === this.operatorString && res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        if (res.searchResults && res.searchResults.length > 0) {
          this.searchResults = {};
          res.searchResults.forEach(card => {
            this.searchResults[card.cardId] = { amount: 1, card, imageUrl: null };
          });

          this.store.dispatch(new fromCardImages.GetCardImages(res.searchResults.map(card => card.cardId), this.operatorString));
        }
      }
    });

    this.store.pipe(select(fromRoot.getCardImages), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operator === this.operatorString && res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        Object.keys(this.searchResults).forEach(id => {
          if (res.entities[id]) {
            this.searchResults[id].imageUrl = res.entities[id].imageURL;
          }
        });
      }
    });
  }

  showAdvanced(): void {
    // const dialogConfig = new MatDialogConfig();
    this.dialog.open(AdvancedSearchDialogComponent, {
      width: '575px',
    });
  }

  toggleElastic(e): void {
    this.searchElastic = e.checked;
  }

  dispatchSearch(): void {
    if (this.searchElastic) {
      this.store.dispatch(new fromCards.SearchElastic(this.searchText.nativeElement.value, this.operatorString));
    } else {
      this.store.dispatch(new fromCards.SearchAdvanced(
        { name: this.searchText.nativeElement.value } as SearchProperties,
        this.operatorString
      ));
    }
  }

  handleAdd(event: CardDictEntry) {
    this.addEmit.emit(event.card);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}

