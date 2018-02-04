import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KafkaPocSharedModule } from '../../shared';
import {
    AppenderEuriskoService,
    AppenderEuriskoPopupService,
    AppenderEuriskoComponent,
    AppenderEuriskoDetailComponent,
    AppenderEuriskoDialogComponent,
    AppenderEuriskoPopupComponent,
    AppenderEuriskoDeletePopupComponent,
    AppenderEuriskoDeleteDialogComponent,
    appenderRoute,
    appenderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...appenderRoute,
    ...appenderPopupRoute,
];

@NgModule({
    imports: [
        KafkaPocSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AppenderEuriskoComponent,
        AppenderEuriskoDetailComponent,
        AppenderEuriskoDialogComponent,
        AppenderEuriskoDeleteDialogComponent,
        AppenderEuriskoPopupComponent,
        AppenderEuriskoDeletePopupComponent,
    ],
    entryComponents: [
        AppenderEuriskoComponent,
        AppenderEuriskoDialogComponent,
        AppenderEuriskoPopupComponent,
        AppenderEuriskoDeleteDialogComponent,
        AppenderEuriskoDeletePopupComponent,
    ],
    providers: [
        AppenderEuriskoService,
        AppenderEuriskoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KafkaPocAppenderEuriskoModule {}
