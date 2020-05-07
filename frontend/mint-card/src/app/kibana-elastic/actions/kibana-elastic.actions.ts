import { Action } from '@ngrx/store';
import { Visualizations } from '../model/visualizations.model';

export enum KibanaElasticActionTypes {
    LoadElastic = '[KibanaElastic] LoadElastic',
    LoadElasticSuccess = '[KibanaElastic] LoadElasticSuccess',
    LoadElasticFailure = '[KibanaElastic] LoadElasticFailure',
    VisualizeKibana = '[KibanaElastic] VisualizeKibana',
    VisualizeKibanaSuccess = '[KibanaElastic] VisualizeKibanaSuccess',
    VisualizeKibanaFailure = '[KibanaElastic] VisualizeKibanaFailure',
    CleanElastic = '[KibanaElastic] CleanElastic',
    CleanElasticSuccess = '[KibanaElastic] CleanElasticSuccess',
    CleanElasticFailure = '[KibanaElastic] CleanElasticFailure',
    CleanKibana = '[KibanaElastic] CleanKibana',
    CleanKibanaSuccess = '[KibanaElastic] CleanKibanaSuccess',
    CleanKibanaFailure = '[KibanaElastic] CleanKibanaFailure',
}

export class LoadElastic implements Action {
    readonly type = KibanaElasticActionTypes.LoadElastic;

    constructor(public cards: string[], public operator: string) { }
}

export class LoadElasticSuccess implements Action {
    readonly type = KibanaElasticActionTypes.LoadElasticSuccess;

    constructor(public payload: any) { }
}

export class LoadElasticFailure implements Action {
    readonly type = KibanaElasticActionTypes.LoadElasticFailure;

    constructor(public payload: any) { }
}

export class VisualizeKibana implements Action {
    readonly type = KibanaElasticActionTypes.VisualizeKibana;

    constructor(public visualizations: string[], public operator: string) { }
}

export class VisualizeKibanaSuccess implements Action {
    readonly type = KibanaElasticActionTypes.VisualizeKibanaSuccess;

    constructor(public payload: Visualizations) { }
}

export class VisualizeKibanaFailure implements Action {
    readonly type = KibanaElasticActionTypes.VisualizeKibanaFailure;

    constructor(public payload: any) { }
}

export class CleanElastic implements Action {
    readonly type = KibanaElasticActionTypes.CleanElastic;

    constructor(public operator: string) { }
}

export class CleanElasticSuccess implements Action {
    readonly type = KibanaElasticActionTypes.CleanElasticSuccess;

    constructor(public payload: any) { }
}

export class CleanElasticFailure implements Action {
    readonly type = KibanaElasticActionTypes.CleanElasticFailure;

    constructor(public payload: any) { }
}

export class CleanKibana implements Action {
    readonly type = KibanaElasticActionTypes.CleanKibana;

    constructor(public operator: string) { }
}

export class CleanKibanaSuccess implements Action {
    readonly type = KibanaElasticActionTypes.CleanKibanaSuccess;

    constructor(public payload: any) { }
}

export class CleanKibanaFailure implements Action {
    readonly type = KibanaElasticActionTypes.CleanKibanaFailure;

    constructor(public payload: any) { }
}



export type KibanaElasticActions =
    | LoadElastic
    | LoadElasticSuccess
    | LoadElasticFailure
    | VisualizeKibana
    | VisualizeKibanaSuccess
    | VisualizeKibanaFailure
    | CleanElastic
    | CleanElasticSuccess
    | CleanElasticFailure
    | CleanKibana
    | CleanKibanaSuccess
    | CleanKibanaFailure
    ;
