import { Action } from '@ngrx/store';
import { CardImage } from '../models/cardImage.model';

export enum CardImageActionTypes {
    GetCardImage = '[CardImage] GetCardImage',
    GetCardImageSuccess = '[CardImage] GetCardImageSuccess',
    GetCardImageFailure = '[CardImage] GetCardImageFailure',
    GetCardImages = '[CardImage] GetCardImages',
    GetCardImagesSuccess = '[CardImage] GetCardImagesSuccess',
    GetCardImagesFailure = '[CardImage] GetCardImagesFailure',
}

export class GetCardImage implements Action {
    readonly type = CardImageActionTypes.GetCardImage;

    constructor(public card: string, public operator: string) { }
}

export class GetCardImageSuccess implements Action {
    readonly type = CardImageActionTypes.GetCardImageSuccess;

    constructor(public payload: CardImage) { }
}

export class GetCardImageFailure implements Action {
    readonly type = CardImageActionTypes.GetCardImageFailure;

    constructor(public payload: any) { }
}

export class GetCardImages implements Action {
    readonly type = CardImageActionTypes.GetCardImages;

    constructor(public cards: string[], public operator: string) { }
}

export class GetCardImagesSuccess implements Action {
    readonly type = CardImageActionTypes.GetCardImagesSuccess;

    constructor(public payload: CardImage[]) { }
}

export class GetCardImagesFailure implements Action {
    readonly type = CardImageActionTypes.GetCardImagesFailure;

    constructor(public payload: any) { }
}

export type CardImageActions =
    | GetCardImage
    | GetCardImageSuccess
    | GetCardImageFailure
    | GetCardImages
    | GetCardImagesSuccess
    | GetCardImagesFailure
    ;
