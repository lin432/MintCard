import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../core/models/responseModel';
import { Deck } from '../models/deck.model';
import { ErrorHandler } from 'src/app/core/services/error.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DeckService {
    topDefault = 10;
    pageDefault = 1;

    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandler) { }

    getDecks(page?: number, top?: number, ownerId?: string): Observable<ResponseModel<Deck[]>> {
        const sendTop = top ? top : this.topDefault;
        const sendPage = page ? page : this.pageDefault;
        const ownerString = ownerId ? `&ownerId=${ownerId}` : '';

        const url = environment.serverUrl + `api/deck/?top=${sendTop}&page=${sendPage}${ownerString}`;

        return new Observable(obs => {
            this.http.get(url)
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Error loading decks')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Deck[]>);
                    } else {
                        obs.next({ error: 'FAILED GET DECKS' } as ResponseModel<Deck[]>);
                    }
                });
        });
    }

    createDeck(deck: Deck): Observable<ResponseModel<Deck>> {
        const url = environment.serverUrl + 'api/deck/';
        return new Observable(obs => {
            this.http.post(url, deck, { withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t create deck')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Deck>);
                    } else {
                        obs.next({ error: 'FAILED CREATE DECKS' } as ResponseModel<Deck>);
                    }
                });
        });
    }

    updateDeck(deck: Deck): Observable<ResponseModel<Deck>> {
        const url = environment.serverUrl + `api/deck/${deck.id}/`;
        return new Observable(obs => {
            this.http.patch(url, deck, { withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t save deck')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<Deck>);
                    } else {
                        obs.next({ error: 'FAILED UPDATE DECKS' } as ResponseModel<Deck>);
                    }
                });
        });
    }

    deleteDeck(deckId: string): Observable<ResponseModel<string>> {
        const url = environment.serverUrl + `api/deck/${deckId}/`;
        return new Observable(obs => {
            this.http.delete(url, { withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t delete deck')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<string>);
                    } else {
                        obs.next({ error: 'FAILED DELETE DECKS' } as ResponseModel<string>);
                    }
                });
        });
    }
}
