import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ScenarioEurisko } from './scenario-eurisko.model';
import { ScenarioEuriskoService } from './scenario-eurisko.service';

@Component({
    selector: 'jhi-scenario-eurisko-detail',
    templateUrl: './scenario-eurisko-detail.component.html'
})
export class ScenarioEuriskoDetailComponent implements OnInit, OnDestroy {

    scenario: ScenarioEurisko;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scenarioService: ScenarioEuriskoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScenarios();
    }

    load(id) {
        this.scenarioService.find(id)
            .subscribe((scenarioResponse: HttpResponse<ScenarioEurisko>) => {
                this.scenario = scenarioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScenarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scenarioListModification',
            (response) => this.load(this.scenario.id)
        );
    }
}
