import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models/responseModel';
import * as fromCardImage from '../actions/card-image.actions';
import { CardService } from '../services/card.services';

@Injectable()
export class CardImageEffects {

    getCardImage$ = createEffect(() => this.actions$.pipe(
        ofType(fromCardImage.CardImageActionTypes.GetCardImage),
        switchMap((action: fromCardImage.GetCardImage) => this.searchService.getCardImage(action.card)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromCardImage.GetCardImageSuccess(res.data);
                } else {
                    return new fromCardImage.GetCardImageFailure(res.error);
                }
            })))
    ));

    getCardImages$ = createEffect(() => this.actions$.pipe(
        ofType(fromCardImage.CardImageActionTypes.GetCardImages),
        switchMap((action: fromCardImage.GetCardImages) => this.searchService.getCardImages(action.cards)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromCardImage.GetCardImagesSuccess(res.data);
                } else {
                    return new fromCardImage.GetCardImagesFailure(res.error);
                }
            })))
    ));

    constructor(
        private actions$: Actions,
        private searchService: CardService
    ) { }
}
