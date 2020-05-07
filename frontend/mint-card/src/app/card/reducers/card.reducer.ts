import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OperationStatusTypes } from '../../core/enums/operationStatusTypes.enum';
import { createFeatureSelector } from '@ngrx/store';
import { CardActions, CardActionTypes } from '../actions/card.actions';
import { Card } from 'src/app/card/models/card.model';

// Extra objects we store along with the entities' Deck list
export interface State extends EntityState<Card> {
    operationStatus: OperationStatusTypes;
    operator: string;
    searchResults: Card[];
}

// Chooses what element to user to build the id of the entity in the entity list
const adapter: EntityAdapter<Card> = createEntityAdapter<Card>({
    selectId: (entity: Card) => entity.cardId,
    sortComparer: false
});

const initialState: State = adapter.getInitialState({
    operationStatus: OperationStatusTypes.Idle,
    operator: null,
    searchResults: []
});

export function reducer(state = initialState, action: CardActions): State {
    switch (action.type) {
        case CardActionTypes.SearchAdvanced: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardActionTypes.SearchAdvancedSuccess: {
            return adapter.addMany(action.payload, {
                ...state, searchResults: action.payload,
                operationStatus: OperationStatusTypes.CompletedSuccess
            });
        }
        case CardActionTypes.SearchAdvancedFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case CardActionTypes.GetCard: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardActionTypes.GetCardSuccess: {
            return adapter.addOne(action.payload, { ...state, operationStatus: OperationStatusTypes.CompletedSuccess });
        }
        case CardActionTypes.GetCardFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case CardActionTypes.GetCards: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardActionTypes.GetCardsSuccess: {
            return adapter.addMany(action.payload, { ...state, operationStatus: OperationStatusTypes.CompletedSuccess });
        }
        case CardActionTypes.GetCardsFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case CardActionTypes.SearchML: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardActionTypes.SearchMLSuccess: {
            return { ...state, searchResults: action.payload, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case CardActionTypes.SearchMLFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case CardActionTypes.SearchElastic: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardActionTypes.SearchElasticSuccess: {
            return {
                ...adapter.addMany(action.payload, state), searchResults: action.payload,
                operationStatus: OperationStatusTypes.CompletedSuccess
            };
        }
        case CardActionTypes.SearchElasticFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        default: {
            return state;
        }
    }
}
