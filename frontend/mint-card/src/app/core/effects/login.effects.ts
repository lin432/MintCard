import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as fromLogin from '../actions/login.actions';
import { UserProfile } from '../models/login.model';
import { ResponseModel } from '../models/responseModel';
import { LoginService } from '../services/login.services';

@Injectable()
export class LoginEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(fromLogin.LoginActionTypes.Login),
        switchMap((action: fromLogin.Login) => this.loginService.login(action.login, action.password)
            .pipe(map((res: ResponseModel<UserProfile>) => {
                if (res.data) {
                    return new fromLogin.LoginSuccess(res.data);
                } else {
                    return new fromLogin.LoginFailure(res.error);
                }
            })))
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(fromLogin.LoginActionTypes.Register),
        switchMap((action: fromLogin.Register) => this.loginService.register(action.login, action.password)
            .pipe(map((res: ResponseModel<UserProfile>) => {
                if (res.data) {
                    return new fromLogin.RegisterSuccess(res.data);
                } else {
                    return new fromLogin.RegisterFailure(res.error);
                }
            })))
    ));

    signout$ = createEffect(() => this.actions$.pipe(
        ofType(fromLogin.LoginActionTypes.SignOut),
        switchMap(() => this.loginService.signOut()
            .pipe(map((res: ResponseModel<boolean>) => {
                if (res.data) {
                    return new fromLogin.SignOutSuccess();
                } else {
                    return new fromLogin.SignOutFailure(res.error);
                }
            })))
    ));

    constructor(
        private actions$: Actions,
        private loginService: LoginService
    ) { }
}
