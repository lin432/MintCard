import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OperationStatusTypes } from '../../core/enums/operationStatusTypes.enum';
import { CardImage } from '../models/cardImage.model';
import { CardImageActionTypes, CardImageActions } from '../actions/card-image.actions';

// Extra objects we store along with the entities' Deck list
export interface State extends EntityState<CardImage> {
    operationStatus: OperationStatusTypes;
    operator: string;
}

// Chooses what element to user to build the id of the entity in the entity list
const adapter: EntityAdapter<CardImage> = createEntityAdapter<CardImage>({
    selectId: (entity: CardImage) => entity.cardId,
    sortComparer: false
});

const initialState: State = adapter.getInitialState({
    operationStatus: OperationStatusTypes.Idle,
    operator: null,
    searchResults: [],
});

export function reducer(state = initialState, action: CardImageActions): State {
    switch (action.type) {
        case CardImageActionTypes.GetCardImage: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardImageActionTypes.GetCardImageSuccess: {
            return adapter.addOne(action.payload, { ...state, operationStatus: OperationStatusTypes.CompletedSuccess });
        }
        case CardImageActionTypes.GetCardImageFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case CardImageActionTypes.GetCardImages: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case CardImageActionTypes.GetCardImagesSuccess: {
            return adapter.addMany(action.payload, { ...state, operationStatus: OperationStatusTypes.CompletedSuccess });
        }
        case CardImageActionTypes.GetCardImagesFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        default: {
            return state;
        }
    }
}
