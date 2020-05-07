import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { ResponseModel } from 'src/app/core/models/responseModel';
import * as fromKibanaElastic from '../actions/kibana-elastic.actions';
import { KibanaElasticService } from '../services/kibana-elastic.services';

@Injectable()
export class KibanaElasticEffects {

    loadElastic$ = createEffect(() => this.actions$.pipe(
        ofType(fromKibanaElastic.KibanaElasticActionTypes.LoadElastic),
        switchMap((action: fromKibanaElastic.LoadElastic) => this.kibanaElasticService.loadElasticIndex(action.cards)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromKibanaElastic.LoadElasticSuccess(res.data);
                } else {
                    return new fromKibanaElastic.LoadElasticFailure(res.error);
                }
            })))
    ));

    visualizeKibana$ = createEffect(() => this.actions$.pipe(
        ofType(fromKibanaElastic.KibanaElasticActionTypes.VisualizeKibana),
        switchMap((action: fromKibanaElastic.VisualizeKibana) => this.kibanaElasticService.getKibanaVisualizeURL(action.visualizations)
            .pipe(map((res) => {
                if (res.data) {
                    return new fromKibanaElastic.VisualizeKibanaSuccess(res.data);
                } else {
                    return new fromKibanaElastic.VisualizeKibanaFailure(res.error);
                }
            })))
    ));

    cleanElastic$ = createEffect(() => this.actions$.pipe(
        ofType(fromKibanaElastic.KibanaElasticActionTypes.CleanElastic),
        switchMap((action: fromKibanaElastic.CleanElastic) => this.kibanaElasticService.cleanElasticIndex()
            .pipe(map((res) => {
                if (res.data) {
                    return new fromKibanaElastic.CleanElasticSuccess(res.data);
                } else {
                    return new fromKibanaElastic.CleanElasticFailure(res.error);
                }
            })))
    ));

    cleanKibana$ = createEffect(() => this.actions$.pipe(
        ofType(fromKibanaElastic.KibanaElasticActionTypes.CleanKibana),
        switchMap((action: fromKibanaElastic.CleanKibana) => this.kibanaElasticService.cleanKibanaSaved()
            .pipe(map((res) => {
                if (res.data) {
                    return new fromKibanaElastic.CleanKibanaSuccess(res.data);
                } else {
                    return new fromKibanaElastic.CleanKibanaFailure(res.error);
                }
            })))
    ));

    constructor(
        private actions$: Actions,
        private kibanaElasticService: KibanaElasticService
    ) { }
}
