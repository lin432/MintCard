import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { UserProfile } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient,
                private errorHandler: ErrorHandler
    ) {

    }

    login(name: string, password: string): Observable<ResponseModel<UserProfile>> {
        const url = environment.serverUrl + 'api/signin/';
        const body = { username: name, password };

        return new Observable(obs => {
            this.http.post(url, body, { withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err,
                    err.status === 401 ? 'Wrong Username or Password' :
                    err.status === 422 ? 'Missing username or password' : 'Failed To Login')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<UserProfile>);
                    } else {
                        obs.next({ error: 'FAILED LOGIN' } as ResponseModel<UserProfile>);
                    }
                });
        });
    }

    register(name: string, password: string): Observable<ResponseModel<UserProfile>> {
        const url = environment.serverUrl + 'api/signup/';
        const body = { username: name, password };

        return new Observable(obs => {
            this.http.post(url, body, { withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err,
                    err.status === 409 ? 'User already exists try a different name' :
                    err.status === 422 ? 'Missing username or password' : 'Registration Failure')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: res } as ResponseModel<UserProfile>);
                    } else {
                        obs.next({ error: 'FAILED REGISTER' } as ResponseModel<UserProfile>);
                    }
                });
        });
    }

    signOut(): Observable<ResponseModel<boolean>> {
        const url = environment.serverUrl + 'api/signout/';

        return new Observable(obs => {
            this.http.get(url, { responseType: 'text', withCredentials: true })
                .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Failed Signout')))
                .subscribe(res => {
                    if (res) {
                        obs.next({ data: true } as ResponseModel<boolean>);
                    } else {
                        obs.next({ error: 'FAILED SIGNOUT' } as ResponseModel<boolean>);
                    }
                });
        });
    }
}
