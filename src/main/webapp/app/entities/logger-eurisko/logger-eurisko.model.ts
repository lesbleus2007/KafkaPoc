import { BaseEntity } from './../../shared';

export class LoggerEurisko implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public burstCount?: number,
        public burstFrequency?: number,
        public scenarioId?: number,
        public appenderId?: number,
    ) {
    }
}
