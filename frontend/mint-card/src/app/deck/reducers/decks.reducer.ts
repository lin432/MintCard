import { Deck } from '../models/deck.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OperationStatusTypes } from '../../core/enums/operationStatusTypes.enum';
import { DeckActionTypes, DeckActions } from '../actions/deck.actions';
import { createFeatureSelector } from '@ngrx/store';
import { act } from '@ngrx/effects';

// Extra objects we store along with the entities' Deck list
export interface State extends EntityState<Deck> {
    operationStatus: OperationStatusTypes;
    recent: string;
    currentDeck: string;
    operator: string;
}


// Chooses what element to user to build the id of the entity in the entity list
const adapter: EntityAdapter<Deck> = createEntityAdapter<Deck>({
    selectId: (entity: Deck) => {
        return entity.id;
    },
    sortComparer: false
});

const initialState: State = adapter.getInitialState({
    operationStatus: OperationStatusTypes.Idle,
    currentDeck: null,
    operator: null
} as State);

export function reducer(state = initialState, action: DeckActions): State {
    switch (action.type) {
        case DeckActionTypes.LoadDecks: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case DeckActionTypes.LoadDecksSuccess: {
            return {
                ...adapter.addAll(action.payload, { ...state }),
                operationStatus: OperationStatusTypes.CompletedSuccess
            };
        }
        case DeckActionTypes.LoadDecksFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case DeckActionTypes.CreateDeck: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case DeckActionTypes.CreateDeckSuccess: {
            return {
                ...adapter.addOne(action.payload, { ...state }),
                operationStatus: OperationStatusTypes.CompletedSuccess,
                currentDeck: action.payload.id
            };
        }
        case DeckActionTypes.CreateDeckFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case DeckActionTypes.UpdateDeck: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case DeckActionTypes.UpdateDeckSuccess: {
            const removeState = adapter.removeOne(action.payload.id, { ...state });
            return {
                ...adapter.addOne(action.payload, { ...removeState }),
                currentDeck: action.payload.id,
                operationStatus: OperationStatusTypes.CompletedSuccess
            };
        }
        case DeckActionTypes.UpdateDeckFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case DeckActionTypes.DeleteDeck: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case DeckActionTypes.DeleteDeckSuccess: {
            const removeState = adapter.removeOne(action.payload, { ...state });
            return {
                ...removeState,
                currentDeck: null,
                operationStatus: OperationStatusTypes.CompletedSuccess
            };
        }
        case DeckActionTypes.DeleteDeckFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case DeckActionTypes.SetCurrentDeck: {
            return { ...state, operationStatus: OperationStatusTypes.Idle, currentDeck: action.deckId, operator: action.operator };
        }
        default: {
            return state;
        }
    }
}
