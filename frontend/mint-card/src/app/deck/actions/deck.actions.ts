import {Action} from '@ngrx/store';
import { Deck } from '../models/deck.model';

export enum DeckActionTypes {
    CreateDeck = '[Deck] CreateDeck',
    CreateDeckSuccess = '[Deck] CreateDeckSuccess',
    CreateDeckFailure = '[Deck] CreateDeckFailure',
    UpdateDeck = '[Deck] UpdateDeck',
    UpdateDeckSuccess = '[Deck] UpdateDeckSuccess',
    UpdateDeckFailure = '[Deck] UpdateDeckFailure',
    DeleteDeck = '[Deck] DeleteDeck',
    DeleteDeckSuccess = '[Deck] DeleteDeckSuccess',
    DeleteDeckFailure = '[Deck] DeleteDeckFailure',
    LoadDecks = '[Deck] LoadDecks',
    LoadDecksSuccess = '[Deck] LoadDecksSuccess',
    LoadDecksFailure = '[Deck] LoadDecksFailure',
    SetCurrentDeck = '[Deck] SetCurrentDeck'
}

export class LoadDecks implements Action {
    readonly type = DeckActionTypes.LoadDecks;

    constructor(public operator: string, public owner: string = null, public top: number = null, public page: number = null) {}
}

export class LoadDecksSuccess implements Action {
    readonly type = DeckActionTypes.LoadDecksSuccess;

    constructor(public payload: Deck[]) {}
}

export class LoadDecksFailure implements Action {
    readonly type = DeckActionTypes.LoadDecksFailure;

    constructor(public payload: any) {}
}

export class CreateDeck implements Action {
    readonly type = DeckActionTypes.CreateDeck;

    constructor(public operator: string, public name: string, public description: string, public cards: string[]) {}
}

export class CreateDeckSuccess implements Action {
    readonly type = DeckActionTypes.CreateDeckSuccess;

    constructor(public payload: Deck) {}
}

export class CreateDeckFailure implements Action {
    readonly type = DeckActionTypes.CreateDeckFailure;

    constructor(public payload: any) {}
}

export class UpdateDeck implements Action {
    readonly type = DeckActionTypes.UpdateDeck;

    constructor(public operator: string, public deck: Deck) {}
}

export class UpdateDeckSuccess implements Action {
    readonly type = DeckActionTypes.UpdateDeckSuccess;

    constructor(public payload: Deck) {}
}

export class UpdateDeckFailure implements Action {
    readonly type = DeckActionTypes.UpdateDeckFailure;

    constructor(public payload: any) {}
}

export class DeleteDeck implements Action {
    readonly type = DeckActionTypes.DeleteDeck;

    constructor(public operator: string, public deckId: string) {}
}

export class DeleteDeckSuccess implements Action {
    readonly type = DeckActionTypes.DeleteDeckSuccess;

    constructor(public payload: string) {}
}

export class DeleteDeckFailure implements Action {
    readonly type = DeckActionTypes.DeleteDeckFailure;

    constructor(public payload: any) {}
}

export class SetCurrentDeck implements Action {
    readonly type = DeckActionTypes.SetCurrentDeck;

    constructor(public operator: string, public deckId: any) {}
}

export type DeckActions =
  | LoadDecks
  | LoadDecksSuccess
  | LoadDecksFailure
  | CreateDeck
  | CreateDeckSuccess
  | CreateDeckFailure
  | UpdateDeck
  | UpdateDeckSuccess
  | UpdateDeckFailure
  | DeleteDeck
  | DeleteDeckSuccess
  | DeleteDeckFailure
  | SetCurrentDeck;
