import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AppenderEuriskoComponent } from './appender-eurisko.component';
import { AppenderEuriskoDetailComponent } from './appender-eurisko-detail.component';
import { AppenderEuriskoPopupComponent } from './appender-eurisko-dialog.component';
import { AppenderEuriskoDeletePopupComponent } from './appender-eurisko-delete-dialog.component';

export const appenderRoute: Routes = [
    {
        path: 'appender-eurisko',
        component: AppenderEuriskoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Appenders'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'appender-eurisko/:id',
        component: AppenderEuriskoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Appenders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const appenderPopupRoute: Routes = [
    {
        path: 'appender-eurisko-new',
        component: AppenderEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Appenders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appender-eurisko/:id/edit',
        component: AppenderEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Appenders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'appender-eurisko/:id/delete',
        component: AppenderEuriskoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Appenders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
