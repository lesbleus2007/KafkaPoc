import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KafkaPocSharedModule } from '../../shared';
import {
    LoggerEuriskoService,
    LoggerEuriskoPopupService,
    LoggerEuriskoComponent,
    LoggerEuriskoDetailComponent,
    LoggerEuriskoDialogComponent,
    LoggerEuriskoPopupComponent,
    LoggerEuriskoDeletePopupComponent,
    LoggerEuriskoDeleteDialogComponent,
    loggerRoute,
    loggerPopupRoute,
    LoggerEuriskoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...loggerRoute,
    ...loggerPopupRoute,
];

@NgModule({
    imports: [
        KafkaPocSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LoggerEuriskoComponent,
        LoggerEuriskoDetailComponent,
        LoggerEuriskoDialogComponent,
        LoggerEuriskoDeleteDialogComponent,
        LoggerEuriskoPopupComponent,
        LoggerEuriskoDeletePopupComponent,
    ],
    entryComponents: [
        LoggerEuriskoComponent,
        LoggerEuriskoDialogComponent,
        LoggerEuriskoPopupComponent,
        LoggerEuriskoDeleteDialogComponent,
        LoggerEuriskoDeletePopupComponent,
    ],
    providers: [
        LoggerEuriskoService,
        LoggerEuriskoPopupService,
        LoggerEuriskoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KafkaPocLoggerEuriskoModule {}
