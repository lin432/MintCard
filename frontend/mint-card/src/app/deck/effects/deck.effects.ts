import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromDecks from '../actions/deck.actions';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DeckService } from '../services/deck.services';
import { ResponseModel } from 'src/app/core/models/responseModel';
import { Deck } from '../models/deck.model';

@Injectable()
export class DeckEffects {

    loadDecks$ = createEffect(() => this.actions$.pipe(
        ofType(fromDecks.DeckActionTypes.LoadDecks),
        switchMap((action: fromDecks.LoadDecks) => this.deckService.getDecks(action.page, action.top, action.owner)
            .pipe(map((res: ResponseModel<Deck[]>) => {
                if (res.data) {
                    return new fromDecks.LoadDecksSuccess(res.data);
                } else {
                    return new fromDecks.LoadDecksFailure(res.error);
                }
            })))
    ));

    createDeck$ = createEffect(() => this.actions$.pipe(
        ofType(fromDecks.DeckActionTypes.CreateDeck),
        switchMap((action: fromDecks.CreateDeck) => this.deckService.createDeck(
            {
                name: action.name,
                description: action.description,
                cards: action.cards,
                id: ''
            } as Deck
        ).pipe(map((res: ResponseModel<Deck>) => {
            if (res.data) {
                return new fromDecks.CreateDeckSuccess(res.data);
            } else {
                return new fromDecks.CreateDeckFailure(res.error);
            }
        })))
    ));

    updateDeck$ = createEffect(() => this.actions$.pipe(
        ofType(fromDecks.DeckActionTypes.UpdateDeck),
        switchMap((action: fromDecks.UpdateDeck) => this.deckService.updateDeck(action.deck)
            .pipe(map((res: ResponseModel<Deck>) => {
                if (res.data) {
                    return new fromDecks.UpdateDeckSuccess(res.data);
                } else {
                    return new fromDecks.UpdateDeckFailure(res.error);
                }
            })))
    ));

    deleteDeck$ = createEffect(() => this.actions$.pipe(
        ofType(fromDecks.DeckActionTypes.DeleteDeck),
        switchMap((action: fromDecks.DeleteDeck) => this.deckService.deleteDeck(action.deckId)
            .pipe(map((res: ResponseModel<string>) => {
                if (res.data) {
                    return new fromDecks.DeleteDeckSuccess(res.data);
                } else {
                    return new fromDecks.DeleteDeckFailure(res.error);
                }
            })))
    ));

    constructor(
        private actions$: Actions,
        private deckService: DeckService
    ) { }
}
