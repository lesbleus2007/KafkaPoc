import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LoggerEurisko } from './logger-eurisko.model';
import { LoggerEuriskoPopupService } from './logger-eurisko-popup.service';
import { LoggerEuriskoService } from './logger-eurisko.service';
import { ScenarioEurisko, ScenarioEuriskoService } from '../scenario-eurisko';
import { AppenderEurisko, AppenderEuriskoService } from '../appender-eurisko';

@Component({
    selector: 'jhi-logger-eurisko-dialog',
    templateUrl: './logger-eurisko-dialog.component.html'
})
export class LoggerEuriskoDialogComponent implements OnInit {

    logger: LoggerEurisko;
    isSaving: boolean;

    scenarios: ScenarioEurisko[];

    appenders: AppenderEurisko[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private loggerService: LoggerEuriskoService,
        private scenarioService: ScenarioEuriskoService,
        private appenderService: AppenderEuriskoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scenarioService.query()
            .subscribe((res: HttpResponse<ScenarioEurisko[]>) => { this.scenarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.appenderService
            .query({filter: 'logger-is-null'})
            .subscribe((res: HttpResponse<AppenderEurisko[]>) => {
                if (!this.logger.appenderId) {
                    this.appenders = res.body;
                } else {
                    this.appenderService
                        .find(this.logger.appenderId)
                        .subscribe((subRes: HttpResponse<AppenderEurisko>) => {
                            this.appenders = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.logger.id !== undefined) {
            this.subscribeToSaveResponse(
                this.loggerService.update(this.logger));
        } else {
            this.subscribeToSaveResponse(
                this.loggerService.create(this.logger));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LoggerEurisko>>) {
        result.subscribe((res: HttpResponse<LoggerEurisko>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LoggerEurisko) {
        this.eventManager.broadcast({ name: 'loggerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackScenarioById(index: number, item: ScenarioEurisko) {
        return item.id;
    }

    trackAppenderById(index: number, item: AppenderEurisko) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-logger-eurisko-popup',
    template: ''
})
export class LoggerEuriskoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loggerPopupService: LoggerEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.loggerPopupService
                    .open(LoggerEuriskoDialogComponent as Component, params['id']);
            } else {
                this.loggerPopupService
                    .open(LoggerEuriskoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
