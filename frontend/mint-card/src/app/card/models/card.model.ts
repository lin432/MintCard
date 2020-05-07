import { Dictionary } from '@ngrx/entity';

export interface Card {
    cardId: string;
    data: CardDetails;
}

export interface CardDetails {
    name: string;
    text: string;
    type: string;
    uuid: string;
    types: string[];
    colors: string[];
    layout: string;
    mtgoId: number;
    rulings: Ruling[];
    subtypes: string[];
    printings: string[];
    edhrecRank: number;
    legalities: Dictionary<string>;
    mtgArenaId: number;
    supertypes: string[];
    colorIdentity: string[];
    scryfallOracleId: string;
    convertedManaCost: number;
    manaCost: string;
    power: string;
    toughness: string;
}

export interface Ruling {
    date: string;
    text: string;
}
