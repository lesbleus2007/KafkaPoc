import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LoggerEurisko } from './logger-eurisko.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LoggerEurisko>;

@Injectable()
export class LoggerEuriskoService {

    private resourceUrl =  SERVER_API_URL + 'api/loggers';

    constructor(private http: HttpClient) { }

    create(logger: LoggerEurisko): Observable<EntityResponseType> {
        const copy = this.convert(logger);
        return this.http.post<LoggerEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(logger: LoggerEurisko): Observable<EntityResponseType> {
        const copy = this.convert(logger);
        return this.http.put<LoggerEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LoggerEurisko>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LoggerEurisko[]>> {
        const options = createRequestOption(req);
        return this.http.get<LoggerEurisko[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LoggerEurisko[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LoggerEurisko = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LoggerEurisko[]>): HttpResponse<LoggerEurisko[]> {
        const jsonResponse: LoggerEurisko[] = res.body;
        const body: LoggerEurisko[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LoggerEurisko.
     */
    private convertItemFromServer(logger: LoggerEurisko): LoggerEurisko {
        const copy: LoggerEurisko = Object.assign({}, logger);
        return copy;
    }

    /**
     * Convert a LoggerEurisko to a JSON which can be sent to the server.
     */
    private convert(logger: LoggerEurisko): LoggerEurisko {
        const copy: LoggerEurisko = Object.assign({}, logger);
        return copy;
    }
}
