import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ScenarioEurisko } from './scenario-eurisko.model';
import { ScenarioEuriskoPopupService } from './scenario-eurisko-popup.service';
import { ScenarioEuriskoService } from './scenario-eurisko.service';

@Component({
    selector: 'jhi-scenario-eurisko-dialog',
    templateUrl: './scenario-eurisko-dialog.component.html'
})
export class ScenarioEuriskoDialogComponent implements OnInit {

    scenario: ScenarioEurisko;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private scenarioService: ScenarioEuriskoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scenario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scenarioService.update(this.scenario));
        } else {
            this.subscribeToSaveResponse(
                this.scenarioService.create(this.scenario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ScenarioEurisko>>) {
        result.subscribe((res: HttpResponse<ScenarioEurisko>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ScenarioEurisko) {
        this.eventManager.broadcast({ name: 'scenarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-scenario-eurisko-popup',
    template: ''
})
export class ScenarioEuriskoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scenarioPopupService: ScenarioEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scenarioPopupService
                    .open(ScenarioEuriskoDialogComponent as Component, params['id']);
            } else {
                this.scenarioPopupService
                    .open(ScenarioEuriskoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
