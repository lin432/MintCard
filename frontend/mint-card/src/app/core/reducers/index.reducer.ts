import {createSelector, createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import * as fromDecks from '../../deck/reducers/decks.reducer';
import * as fromLogin from './login.reducer';
import * as fromCards from '../../card/reducers/card.reducer';
import * as fromCardImages from '../../card/reducers/card-image.reducer';
import * as fromKibanaElastic from '../../kibana-elastic/reducers/kibana-elastic.reducer';

export interface State {
    decks: fromDecks.State;
    login: fromLogin.State;
    register: fromLogin.State;
    cards: fromCards.State;
    cardImages: fromCardImages.State;
    kibanaElastic: fromKibanaElastic.State;
}


export const getLogin = createFeatureSelector<fromLogin.State>('login');
export const getRegister = createFeatureSelector<fromLogin.State>('register');
export const getDecks = createFeatureSelector<fromDecks.State>('decks');
export const getCards = createFeatureSelector<fromCards.State>('cards');
export const getCardImages = createFeatureSelector<fromCardImages.State>('cardImages');
export const getKibanaElastic = createFeatureSelector<fromKibanaElastic.State>('kibanaElastic');


export const reducers: ActionReducerMap<State> = {
    decks: fromDecks.reducer,
    login: fromLogin.reducer,
    register: fromLogin.reducer,
    cards: fromCards.reducer,
    kibanaElastic: fromKibanaElastic.reducer,
    cardImages: fromCardImages.reducer
};
