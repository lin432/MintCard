import { OperationStatusTypes } from '../enums/operationStatusTypes.enum';
import { UserProfile } from '../models/login.model';
import { createFeatureSelector } from '@ngrx/store';
import { LoginActions, LoginActionTypes } from '../actions/login.actions';

export interface State {
    operationStatus: OperationStatusTypes;
    login: UserProfile;
    operator: string;
}

const initialState: State = {
    operationStatus: OperationStatusTypes.Idle,
    operator: null,
    login: null
} as State;

export function reducer(state = initialState, action: LoginActions): State {
    switch (action.type) {
        case LoginActionTypes.Login: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case LoginActionTypes.LoginFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case LoginActionTypes.LoginSuccess: {
            return { ...state, login: action.payload, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case LoginActionTypes.Register: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case LoginActionTypes.RegisterFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case LoginActionTypes.RegisterSuccess: {
            return { ...state, login: action.payload, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        case LoginActionTypes.SignOut: {
            return { ...state, operationStatus: OperationStatusTypes.Initiated, operator: action.operator };
        }
        case LoginActionTypes.SignOutFailure: {
            return { ...state, operationStatus: OperationStatusTypes.CompletedFailure };
        }
        case LoginActionTypes.SignOutSuccess: {
            return { ...state, login: null, operationStatus: OperationStatusTypes.CompletedSuccess };
        }
        default: {
            return state;
        }
    }
}
