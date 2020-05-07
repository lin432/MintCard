import { Action } from '@ngrx/store';
import { SearchProperties } from '../models/search.model';
import { Card } from 'src/app/card/models/card.model';

export enum CardActionTypes {
    SearchAdvanced = '[Search] SearchAdvanced',
    SearchAdvancedSuccess = '[Search] SearchAdvancedSuccess',
    SearchAdvancedFailure = '[Search] SearchAdvancedFailure',
    GetCard = '[Card] getCard',
    GetCardSuccess = '[Card] GetCardSuccess',
    GetCardFailure = '[Card] GetCardFailure',
    GetCards = '[Card] getCards',
    GetCardsSuccess = '[Card] GetCardsSuccess',
    GetCardsFailure = '[Card] GetCardsFailure',
    SearchML = '[Search] SearchML',
    SearchMLSuccess = '[Search] SearchMLSuccess',
    SearchMLFailure = '[Search] SearchMLFailure',
    SearchElastic = '[Search] SearchElastic',
    SearchElasticSuccess = '[Search] SearchElasticSuccess',
    SearchElasticFailure = '[Search] SearchElasticFailure',
}

export class SearchAdvanced implements Action {
    readonly type = CardActionTypes.SearchAdvanced;

    constructor(public payload: SearchProperties, public operator: string) { }
}

export class SearchAdvancedSuccess implements Action {
    readonly type = CardActionTypes.SearchAdvancedSuccess;

    constructor(public payload: Card[]) { }
}

export class SearchAdvancedFailure implements Action {
    readonly type = CardActionTypes.SearchAdvancedFailure;

    constructor(public payload: any) { }
}

export class GetCard implements Action {
    readonly type = CardActionTypes.GetCard;

    constructor(public card: string, public operator: string) { }
}

export class GetCardSuccess implements Action {
    readonly type = CardActionTypes.GetCardSuccess;

    constructor(public payload: Card) { }
}

export class GetCardFailure implements Action {
    readonly type = CardActionTypes.GetCardFailure;

    constructor(public payload: any) { }
}

export class GetCards implements Action {
    readonly type = CardActionTypes.GetCards;

    constructor(public cards: string[], public operator: string) { }
}

export class GetCardsSuccess implements Action {
    readonly type = CardActionTypes.GetCardsSuccess;

    constructor(public payload: Card[]) { }
}

export class GetCardsFailure implements Action {
    readonly type = CardActionTypes.GetCardsFailure;

    constructor(public payload: any) { }
}

export class SearchML implements Action {
    readonly type = CardActionTypes.SearchML;

    constructor(public text: string, public operator: string) { }
}

export class SearchMLSuccess implements Action {
    readonly type = CardActionTypes.SearchMLSuccess;

    constructor(public payload: Card[]) { }
}

export class SearchMLFailure implements Action {
    readonly type = CardActionTypes.SearchMLFailure;

    constructor(public payload: any) { }
}

export class SearchElastic implements Action {
    readonly type = CardActionTypes.SearchElastic;

    constructor(public text: string, public operator: string) { }
}

export class SearchElasticSuccess implements Action {
    readonly type = CardActionTypes.SearchElasticSuccess;

    constructor(public payload: Card[]) { }
}

export class SearchElasticFailure implements Action {
    readonly type = CardActionTypes.SearchElasticFailure;

    constructor(public payload: any) { }
}



export type CardActions =
    | SearchAdvanced
    | SearchAdvancedSuccess
    | SearchAdvancedFailure
    | GetCard
    | GetCardSuccess
    | GetCardFailure
    | GetCards
    | GetCardsSuccess
    | GetCardsFailure
    | SearchML
    | SearchMLSuccess
    | SearchMLFailure
    | SearchElastic
    | SearchElasticSuccess
    | SearchElasticFailure
    ;
