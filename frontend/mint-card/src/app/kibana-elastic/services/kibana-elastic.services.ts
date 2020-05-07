import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../core/models/responseModel';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/core/services/error.service';
import { Visualizations } from '../model/visualizations.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class KibanaElasticService {
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandler,
        private sanitizer: DomSanitizer
        ) {
    }

    loadElasticIndex(cards: string[]): Observable<ResponseModel<boolean>> {
        const url = environment.serverUrl + `api/elastic/load/`;
        return new Observable(obs => {
            this.http.post(url, {cards}, { withCredentials: true })
            .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t load elastic data')))
            .subscribe(res => {
                if (res) {
                    obs.next({data: true} as ResponseModel<boolean>);
                } else {
                    obs.next({ error: 'FAILED TO LOAD ELASTIC'} as ResponseModel<boolean>);
                }
            });
        });
    }

    getKibanaVisualizeURL(visualizations: string[]): Observable<ResponseModel<Visualizations>> {
        const url = environment.serverUrl + `api/kibana/visualize/`;

        return new Observable(obs => {
            this.http.post(url, {patterns: visualizations}, { withCredentials: true })
            .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t get visualizations')))
            .subscribe(res => {
                if (res) {
                    Object.keys(res).forEach(key => {
                        res[key] = this.sanitizer.bypassSecurityTrustResourceUrl(res[key]);
                    });
                    obs.next({data: res} as ResponseModel<Visualizations>);
                } else {
                    obs.next({ error: 'FAILED TO MAKE VISUALIZATIONS'} as ResponseModel<Visualizations>);
                }
            });
        });
    }

    cleanElasticIndex(): Observable<ResponseModel<boolean>> {
        const url = environment.serverUrl + `api/elastic`;

        return new Observable(obs => {
            this.http.delete(url, { withCredentials: true })
            .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t clean elastic index')))
            .subscribe(res => {
                if (res) {
                    obs.next({data: true} as ResponseModel<boolean>);
                } else {
                    obs.next({ error: 'FAILED TO CLEAN ELASTIC INDEX'} as ResponseModel<boolean>);
                }
            });
        });
    }

    cleanKibanaSaved(): Observable<ResponseModel<boolean>> {
        const url = environment.serverUrl + `api/kibana`;

        return new Observable(obs => {
            this.http.delete(url, { withCredentials: true })
            .pipe(catchError(err => this.errorHandler.handleHTTPError(err, 'Couldn\'t clean kibana objects')))
            .subscribe(res => {
                if (res) {
                    obs.next({data: true} as ResponseModel<boolean>);
                } else {
                    obs.next({ error: 'FAILED TO CLEAN KIBANA SAVED OBJECTS'} as ResponseModel<boolean>);
                }
            });
        });
    }

}
