import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ScenarioEuriskoComponent } from './scenario-eurisko.component';
import { ScenarioEuriskoDetailComponent } from './scenario-eurisko-detail.component';
import { ScenarioEuriskoPopupComponent } from './scenario-eurisko-dialog.component';
import { ScenarioEuriskoDeletePopupComponent } from './scenario-eurisko-delete-dialog.component';

export const scenarioRoute: Routes = [
    {
        path: 'scenario-eurisko',
        component: ScenarioEuriskoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Scenarios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scenario-eurisko/:id',
        component: ScenarioEuriskoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Scenarios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scenarioPopupRoute: Routes = [
    {
        path: 'scenario-eurisko-new',
        component: ScenarioEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Scenarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scenario-eurisko/:id/edit',
        component: ScenarioEuriskoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Scenarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scenario-eurisko/:id/delete',
        component: ScenarioEuriskoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Scenarios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
