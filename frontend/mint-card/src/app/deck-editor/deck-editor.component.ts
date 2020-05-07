import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as fromRoot from '../core/reducers/index.reducer';
import * as fromDecks from '../deck/actions/deck.actions';
import * as fromCards from '../card/actions/card.actions';
import * as fromCardImages from '../card/actions/card-image.actions';
import * as fromKibanaElastic from '../kibana-elastic/actions/kibana-elastic.actions';
import { Subject, Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { OperationStatusTypes } from '../core/enums/operationStatusTypes.enum';
import { Card } from '../card/models/card.model';
import { Dictionary } from '@ngrx/entity';
import { CardDictEntry } from '../card-list/card-list.model';
import { Deck, createBlankDeck } from '../deck/models/deck.model';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './description-dialog/description-dialog.component';
import { CardImage } from '../card/models/cardImage.model';

@Component({
  selector: 'app-deck-editor',
  templateUrl: './deck-editor.component.html',
  styleUrls: ['./deck-editor.component.scss']
})
export class DeckEditorComponent implements OnInit, OnDestroy {
  private operatorString = 'DeckEdit';
  @Input() feedCards: Subject<Card>;
  private feedSubscription$: Subscription;
  private destroyed$ = new Subject<boolean>();
  decks: Deck[] = [];
  currentDeck: Deck = createBlankDeck();
  private cardIds: string[] = [];
  cards: Dictionary<CardDictEntry> = {};
  initialized = false;
  description = '';
  private images: Dictionary<CardImage>;

  deckFormControl: FormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private store: Store<fromRoot.State>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fromRoot.getDecks), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operator === this.operatorString && res.operationStatus === OperationStatusTypes.Idle) {
        if (res.currentDeck && res.entities[res.currentDeck]) {
          this.setDeck(res.entities[res.currentDeck]);
        } else {
          this.newDeck();
        }
      }
      if (res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        this.decks = [];
        Object.keys(res.entities).map(key => this.decks.push(res.entities[key]));

        if (res.currentDeck && res.entities[res.currentDeck]) {
          this.loadDeck(res.entities[res.currentDeck]);
        } else {
          this.newDeck();
        }
      }
    });

    this.store.pipe(select(fromRoot.getCards), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operator === this.operatorString && res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        this.cards = {};
        this.cardIds.forEach(id => {
          if (!this.cards[id] || this.cards[id] === undefined) {
            this.cards[id] = { card: null, amount: 0, imageUrl: null };
          }
          this.cards[id].amount++;
        });

        this.cardIds.forEach(id => {
          this.cards[id].card = res.entities[id];
        });

        if (this.cardIds && this.cardIds.length > 0) {
          this.store.dispatch(new fromCardImages.GetCardImages(this.cardIds, this.operatorString));
        }
      }
    });

    this.store.pipe(select(fromRoot.getCardImages), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.operator === this.operatorString && res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        if (this.cardIds) {
          Object.keys(this.cards).forEach(id => {
            if (res.entities[id]) {
              this.cards[id].imageUrl = res.entities[id].imageURL;
            }
          });
        }
      }
      if (res.operationStatus === OperationStatusTypes.CompletedSuccess) {
        this.images = res.entities;
      }
    });

    // Get decks of logged in user
    this.store.pipe(select(fromRoot.getLogin), takeUntil(this.destroyed$)).subscribe(res => {
      if (res.login && res.login.username && !this.initialized) {
        this.store.dispatch(new fromDecks.LoadDecks(this.operatorString, res.login.username));
        this.initialized = true;
      }
    });

    // Add cards on request
    if (this.feedCards) {
      this.feedSubscription$ = this.feedCards.subscribe((card: Card) => {
        if (!this.cards[card.cardId] || this.cards[card.cardId] === undefined) {
          this.cards[card.cardId] = { amount: 0, card, imageUrl: null };
        }
        this.cardIds.push(card.cardId);
        this.cards[card.cardId].amount++;
        this.cards[card.cardId].imageUrl = this.images[card.cardId].imageURL;
      });
    }
  }

  // Reset fields and remove everything in deck
  newDeck() {
    this.currentDeck = createBlankDeck();
    this.deckFormControl.setValue('');
    this.description = '';
    this.cardIds = [];
    this.cards = {};
    this.deckFormControl.markAsPristine();
  }

  // Make a new deck or save it based on the id
  saveDeck() {
    if (this.deckFormControl.errors) {
      this.deckFormControl.markAsTouched();
    } else {
      const currCards = this.getCards();
      // Make a new DB entry
      if (!this.currentDeck.id) {
        this.store.dispatch(new fromDecks.CreateDeck(this.operatorString, this.deckFormControl.value, this.description, currCards));
      } else {
        // save existing db entry
        const deck = {
          id: this.currentDeck.id,
          name: this.deckFormControl.value,
          description: this.description,
          owner: this.currentDeck.owner,
          cards: currCards
        };
        this.store.dispatch(new fromDecks.UpdateDeck(this.operatorString, deck));
      }
    }
  }

  // switch the loaded deck
  loadDeck(deck: Deck) {
    this.store.dispatch(new fromDecks.SetCurrentDeck(this.operatorString, deck.id));
  }

  setDeck(deck: Deck) {
    this.currentDeck = deck;
    this.deckFormControl.setValue(deck.name);
    this.description = deck.description;
    this.cardIds = deck.cards;
    this.store.dispatch(new fromCards.GetCards(this.cardIds, this.operatorString));
    this.store.dispatch(new fromKibanaElastic.LoadElastic(this.cardIds, this.operatorString));
  }

  // delete the current deck
  deleteDeck() {
    if (this.currentDeck.id) {
      this.store.dispatch(new fromDecks.DeleteDeck(this.operatorString, this.currentDeck.id));
    }
  }

  getCards(): string[] {
    const returnArr = [];
    Object.keys(this.cards).forEach(key => {
      for (let i = 0; i < this.cards[key].amount; i++) {
        returnArr.push(key);
      }
    });

    return returnArr;
  }

  openDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      data: this.description,
      width: '400px',
      height: '485px'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.description = res;
      }
    });
  }

  update() {
    this.cardIds = this.getCards();
    this.store.dispatch(new fromKibanaElastic.LoadElastic(this.cardIds, this.operatorString));
  }

  ngOnDestroy(): void {
    if (this.feedSubscription$) {
      this.feedSubscription$.unsubscribe();
    }

    this.destroyed$.next(true);
  }

}
