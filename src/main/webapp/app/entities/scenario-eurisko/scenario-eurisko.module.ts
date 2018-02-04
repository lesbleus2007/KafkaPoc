import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KafkaPocSharedModule } from '../../shared';
import {
    ScenarioEuriskoService,
    ScenarioEuriskoPopupService,
    ScenarioEuriskoComponent,
    ScenarioEuriskoDetailComponent,
    ScenarioEuriskoDialogComponent,
    ScenarioEuriskoPopupComponent,
    ScenarioEuriskoDeletePopupComponent,
    ScenarioEuriskoDeleteDialogComponent,
    scenarioRoute,
    scenarioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...scenarioRoute,
    ...scenarioPopupRoute,
];

@NgModule({
    imports: [
        KafkaPocSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ScenarioEuriskoComponent,
        ScenarioEuriskoDetailComponent,
        ScenarioEuriskoDialogComponent,
        ScenarioEuriskoDeleteDialogComponent,
        ScenarioEuriskoPopupComponent,
        ScenarioEuriskoDeletePopupComponent,
    ],
    entryComponents: [
        ScenarioEuriskoComponent,
        ScenarioEuriskoDialogComponent,
        ScenarioEuriskoPopupComponent,
        ScenarioEuriskoDeleteDialogComponent,
        ScenarioEuriskoDeletePopupComponent,
    ],
    providers: [
        ScenarioEuriskoService,
        ScenarioEuriskoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KafkaPocScenarioEuriskoModule {}
