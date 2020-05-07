import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { OperationStatusTypes } from '../../core/enums/operationStatusTypes.enum';
import { createFeatureSelector } from '@ngrx/store';
import { Visualizations } from '../model/visualizations.model';
import { KibanaElasticActions, KibanaElasticActionTypes } from '../actions/kibana-elastic.actions';

// Extra objects we store along with the entities' Deck list
export interface State {
    operationStatus: OperationStatusTypes;
    elasticIntialized: boolean;
    visualizations: Visualizations;
    operator: string;
}


const initialState: State = {
    operationStatus: OperationStatusTypes.Idle,
    elasticIntialized: false,
    visualizations: null,
    operator: null
};

export function reducer(state = initialState, action: KibanaElasticActions): State {
    switch (action.type) {
        case KibanaElasticActionTypes.LoadElastic: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case KibanaElasticActionTypes.LoadElasticSuccess: {
            return { ...state, elasticIntialized: action.payload, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case KibanaElasticActionTypes.LoadElasticFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case KibanaElasticActionTypes.VisualizeKibana: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case KibanaElasticActionTypes.VisualizeKibanaSuccess: {
            return { ...state, visualizations: action.payload, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case KibanaElasticActionTypes.VisualizeKibanaFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case KibanaElasticActionTypes.CleanElastic: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case KibanaElasticActionTypes.CleanElasticSuccess: {
            return { ...state, elasticIntialized: false, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case KibanaElasticActionTypes.CleanElasticFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case KibanaElasticActionTypes.CleanKibana: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case KibanaElasticActionTypes.CleanKibanaSuccess: {
            return { ...state, visualizations: null, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case KibanaElasticActionTypes.CleanKibanaFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        default: {
            return state;
        }
    }
}
