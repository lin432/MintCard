export interface Deck {
    id: string; // uuid
    name: string;
    description: string;
    cards: Array<string>; // uuid
    owner: string; // uuid
}

export function createBlankDeck(): Deck {
    return {id: null, description: null, cards: [], name: null, owner: null};
}
