import { BaseEntity } from './../../shared';

export class ScenarioEurisko implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public loggers?: BaseEntity[],
    ) {
    }
}
