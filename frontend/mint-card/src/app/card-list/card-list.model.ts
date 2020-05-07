import { Card } from '../card/models/card.model';

export interface CardDictEntry {
    amount: number;
    card: Card;
    imageUrl: string;
}
