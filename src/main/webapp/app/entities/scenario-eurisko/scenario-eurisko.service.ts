import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ScenarioEurisko } from './scenario-eurisko.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ScenarioEurisko>;

@Injectable()
export class ScenarioEuriskoService {

    private resourceUrl =  SERVER_API_URL + 'api/scenarios';

    constructor(private http: HttpClient) { }

    create(scenario: ScenarioEurisko): Observable<EntityResponseType> {
        const copy = this.convert(scenario);
        return this.http.post<ScenarioEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(scenario: ScenarioEurisko): Observable<EntityResponseType> {
        const copy = this.convert(scenario);
        return this.http.put<ScenarioEurisko>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ScenarioEurisko>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ScenarioEurisko[]>> {
        const options = createRequestOption(req);
        return this.http.get<ScenarioEurisko[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ScenarioEurisko[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ScenarioEurisko = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ScenarioEurisko[]>): HttpResponse<ScenarioEurisko[]> {
        const jsonResponse: ScenarioEurisko[] = res.body;
        const body: ScenarioEurisko[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ScenarioEurisko.
     */
    private convertItemFromServer(scenario: ScenarioEurisko): ScenarioEurisko {
        const copy: ScenarioEurisko = Object.assign({}, scenario);
        return copy;
    }

    /**
     * Convert a ScenarioEurisko to a JSON which can be sent to the server.
     */
    private convert(scenario: ScenarioEurisko): ScenarioEurisko {
        const copy: ScenarioEurisko = Object.assign({}, scenario);
        return copy;
    }
}
