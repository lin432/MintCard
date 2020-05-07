import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandler {

    constructor(
        private snackBar: MatSnackBar
    ) {}

    handleHTTPError(err: HttpErrorResponse, msg?: string): Observable<null> {
        return new Observable(obs => {
            this.snackBar.open(msg ? msg : err.message, null, {
                duration: 2000,
            });
            obs.next();
        });

    }

}
