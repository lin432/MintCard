import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../core/models/responseModel';
import { Card } from 'src/app/card/models/card.model';
import { SearchProperties } from '../models/search.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/core/services/error.service';
import { CardImage } from '../models/cardImage.model';

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandler) {
    }

    searchAdvanced(properties: SearchProperties): Observable<ResponseModel<Card[]>> {
        console.log(properties);
        const url = environment.serverUrl + `api/card/advanced/`;

        return new Observable(obs => {
            this.http.post(url, properties)
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t search the DB')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Card[]>);
                    } else {
                        obs.next({ error: 'FAILED GET CARDS' } as ResponseModel<Card[]>);
                    }
                });
        });
    }

    searchML(text: string): Observable<ResponseModel<Card[]>> {
        const url = environment.serverUrl + `api/card/ml/`;

        return new Observable(obs => {
            this.http.post(url, { text })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t search the DB')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Card[]>);
                    } else {
                        obs.next({ error: 'FAILED GET CARDS' } as ResponseModel<Card[]>);
                    }
                });
        });
    }

    searchElastic(text: string): Observable<ResponseModel<Card[]>> {
        const url = environment.serverUrl + `api/elastic/card/`;

        return new Observable(obs => {
            this.http.post(url, { text })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t search the DB')))
                .subscribe((res: any[]) => {
                    if (res) {
                        const retArr = [];
                        res.forEach(card => retArr.push({ cardId: card._source.cardId, data: card._source }));
                        obs.next({ data: retArr } as ResponseModel<Card[]>);
                    } else {
                        obs.next({ error: 'FAILED GET CARDS' } as ResponseModel<Card[]>);
                    }
                });
        });
    }

    getCard(cardId: string): Observable<ResponseModel<Card>> {
        const url = environment.serverUrl + `api/card/${cardId}/`;

        return new Observable(obs => {
            this.http.get(url)
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t get card details')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Card>);
                    } else {
                        obs.next({ error: 'FAILED GET CARDS' } as ResponseModel<Card>);
                    }
                });
        });
    }

    getCards(cardIds: string[]): Observable<ResponseModel<Card[]>> {
        const url = environment.serverUrl + `api/card/byIds/`;

        return new Observable(obs => {
            this.http.post(url, { cardIds })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t details of requested cards')))
                .subscribe((res: any[]) => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Card[]>);
                    } else {
                        obs.next({ error: 'FAILED GET CARDS' } as ResponseModel<Card[]>);
                    }
                });
        });
    }

    getCardImage(cardId: string): Observable<ResponseModel<CardImage>> {
        const url = environment.serverUrl + `api/card/image/${cardId}`;

        return new Observable(obs => {
            this.http.get(url)
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t get image of requested card')))
                .subscribe((res: any) => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<CardImage>);
                    } else {
                        obs.next({ error: 'FAILED GET CARD Image' } as ResponseModel<CardImage>);
                    }
                });
        });
    }

    getCardImages(cardIds: string[]): Observable<ResponseModel<CardImage[]>> {
        let query = '';
        cardIds.forEach(cardId => query = query + `ids[]=${cardId}&`);
        query = query.slice(0, query.length - 1);
        const url = environment.serverUrl + 'api/card/image/byIds?' + query;

        return new Observable(obs => {
            this.http.get(url)
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t get images of requested cards')))
                .subscribe((res: any[]) => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<CardImage[]>);
                    } else {
                        obs.next({ error: 'FAILED GET CARD Images' } as ResponseModel<CardImage[]>);
                    }
                });
        });
    }
}
