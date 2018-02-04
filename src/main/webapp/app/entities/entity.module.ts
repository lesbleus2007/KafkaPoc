import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { KafkaPocScenarioEuriskoModule } from './scenario-eurisko/scenario-eurisko.module';
import { KafkaPocLoggerEuriskoModule } from './logger-eurisko/logger-eurisko.module';
import { KafkaPocAppenderEuriskoModule } from './appender-eurisko/appender-eurisko.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        KafkaPocScenarioEuriskoModule,
        KafkaPocLoggerEuriskoModule,
        KafkaPocAppenderEuriskoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class KafkaPocEntityModule {}
