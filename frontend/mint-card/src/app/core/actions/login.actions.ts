import {Action} from '@ngrx/store';
import { UserProfile } from '../models/login.model';

export enum LoginActionTypes {
    Login = '[Login] Login',
    LoginSuccess = '[Login] LoginSuccess',
    LoginFailure = '[Login] LoginFailure',
    Register = '[Login] Register',
    RegisterSuccess = '[Login] RegisterSuccess',
    RegisterFailure = '[Login] RegisterFailure',
    SignOut = '[Login] SignOut',
    SignOutSuccess = '[Login] SignOutSuccess',
    SignOutFailure = '[Login] SignOutFailure'
}

export class Login implements Action {
    readonly type = LoginActionTypes.Login;

    constructor(public login, public password, public operator: string) {}
}

export class LoginSuccess implements Action {
    readonly type = LoginActionTypes.LoginSuccess;

    constructor(public payload: UserProfile) {}
}

export class LoginFailure implements Action {
    readonly type = LoginActionTypes.LoginFailure;

    constructor(public payload: any) {}
}

export class Register implements Action {
    readonly type = LoginActionTypes.Register;

    constructor(public login, public password, public operator: string) {}
}

export class RegisterSuccess implements Action {
    readonly type = LoginActionTypes.RegisterSuccess;

    constructor(public payload: UserProfile) {}
}

export class RegisterFailure implements Action {
    readonly type = LoginActionTypes.RegisterFailure;

    constructor(public payload: any) {}
}

export class SignOut implements Action {
    readonly type = LoginActionTypes.SignOut;

    constructor(public operator: string) {}
}

export class SignOutSuccess implements Action {
    readonly type = LoginActionTypes.SignOutSuccess;

    constructor() {}
}

export class SignOutFailure implements Action {
    readonly type = LoginActionTypes.SignOutFailure;

    constructor(public payload: any) {}
}

export type LoginActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | SignOut
  | SignOutSuccess
  | SignOutFailure;
