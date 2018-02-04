import { BaseEntity } from './../../shared';

export class AppenderEurisko implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public isAsync?: boolean,
        public topic?: string,
    ) {
        this.isAsync = false;
    }
}
