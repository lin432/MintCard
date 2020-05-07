import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models/responseModel';
import * as fromSearch from '../actions/card.actions';
import { CardService } from '../services/card.services';

@Injectable()
export class CardEffects {

    searchAdvanced$ = createEffect(() => this.actions$.pipe(
        ofType(fromSearch.CardActionTypes.SearchAdvanced),
        switchMap((action: fromSearch.SearchAdvanced) => this.searchService.searchAdvanced(action.payload)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromSearch.SearchAdvancedSuccess(res.data);
                } else {
                    return new fromSearch.SearchAdvancedFailure(res.error);
                }
            })))
    ));

    searchML$ = createEffect(() => this.actions$.pipe(
        ofType(fromSearch.CardActionTypes.SearchML),
        switchMap((action: fromSearch.SearchML) => this.searchService.searchML(action.text)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromSearch.SearchMLSuccess(res.data);
                } else {
                    return new fromSearch.SearchMLFailure(res.error);
                }
            })))
    ));

    searchElastic$ = createEffect(() => this.actions$.pipe(
        ofType(fromSearch.CardActionTypes.SearchElastic),
        switchMap((action: fromSearch.SearchElastic) => this.searchService.searchElastic(action.text)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromSearch.SearchElasticSuccess(res.data);
                } else {
                    return new fromSearch.SearchElasticFailure(res.error);
                }
            })))
    ));

    getCard$ = createEffect(() => this.actions$.pipe(
        ofType(fromSearch.CardActionTypes.GetCard),
        switchMap((action: fromSearch.GetCard) => this.searchService.getCard(action.card)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromSearch.GetCardSuccess(res.data);
                } else {
                    return new fromSearch.GetCardFailure(res.error);
                }
            })))
    ));

    getCards$ = createEffect(() => this.actions$.pipe(
        ofType(fromSearch.CardActionTypes.GetCards),
        switchMap((action: fromSearch.GetCards) => this.searchService.getCards(action.cards)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromSearch.GetCardsSuccess(res.data);
                } else {
                    return new fromSearch.GetCardsFailure(res.error);
                }
            })))
    ));

    constructor(
        private actions$: Actions,
        private searchService: CardService
    ) { }
}
