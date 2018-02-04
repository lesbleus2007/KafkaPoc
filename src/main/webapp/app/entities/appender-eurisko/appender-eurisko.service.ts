import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AppenderEurisko } from './appender-eurisko.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AppenderEurisko>;

@Injectable()
export class AppenderEuriskoService {

    private resourceUrl =  SERVER_API_URL + 'api/appenders';

    constructor(private http: HttpClient) { }

    create(appender: AppenderEurisko): Observable<EntityResponseType> {
        const copy = this.convert(appender);
        return this.http.post<AppenderEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(appender: AppenderEurisko): Observable<EntityResponseType> {
        const copy = this.convert(appender);
        return this.http.put<AppenderEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AppenderEurisko>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AppenderEurisko[]>> {
        const options = createRequestOption(req);
        return this.http.get<AppenderEurisko[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AppenderEurisko[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AppenderEurisko = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AppenderEurisko[]>): HttpResponse<AppenderEurisko[]> {
        const jsonResponse: AppenderEurisko[] = res.body;
        const body: AppenderEurisko[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AppenderEurisko.
     */
    private convertItemFromServer(appender: AppenderEurisko): AppenderEurisko {
        const copy: AppenderEurisko = Object.assign({}, appender);
        return copy;
    }

    /**
     * Convert a AppenderEurisko to a JSON which can be sent to the server.
     */
    private convert(appender: AppenderEurisko): AppenderEurisko {
        const copy: AppenderEurisko = Object.assign({}, appender);
        return copy;
    }
}
