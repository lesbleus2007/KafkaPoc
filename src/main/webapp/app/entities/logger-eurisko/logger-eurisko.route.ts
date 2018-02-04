import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { LoggerEuriskoComponent } from './logger-eurisko.component';
import { LoggerEuriskoDetailComponent } from './logger-eurisko-detail.component';
import { LoggerEuriskoPopupComponent } from './logger-eurisko-dialog.component';
import { LoggerEuriskoDeletePopupComponent } from './logger-eurisko-delete-dialog.component';

@Injectable()
export class LoggerEuriskoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const loggerRoute: Routes = [
    {
        path: 'logger-eurisko',
        component: LoggerEuriskoComponent,
        resolve: {
            'pagingParams': LoggerEuriskoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Loggers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'logger-eurisko/:id',
        component: LoggerEuriskoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Loggers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const loggerPopupRoute: Routes = [
    {
        path: 'logger-eurisko-new',
        component: LoggerEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Loggers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'logger-eurisko/:id/edit',
        component: LoggerEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Loggers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'logger-eurisko/:id/delete',
        component: LoggerEuriskoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Loggers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
