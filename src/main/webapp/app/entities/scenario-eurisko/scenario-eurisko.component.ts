import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ScenarioEurisko } from './scenario-eurisko.model';
import { ScenarioEuriskoService } from './scenario-eurisko.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-scenario-eurisko',
    templateUrl: './scenario-eurisko.component.html'
})
export class ScenarioEuriskoComponent implements OnInit, OnDestroy {
scenarios: ScenarioEurisko[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scenarioService: ScenarioEuriskoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.scenarioService.query().subscribe(
            (res: HttpResponse<ScenarioEurisko[]>) => {
                this.scenarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInScenarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ScenarioEurisko) {
        return item.id;
    }
    registerChangeInScenarios() {
        this.eventSubscriber = this.eventManager.subscribe('scenarioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
