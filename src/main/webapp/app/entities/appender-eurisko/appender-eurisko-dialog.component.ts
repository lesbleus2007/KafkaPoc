import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppenderEurisko } from './appender-eurisko.model';
import { AppenderEuriskoPopupService } from './appender-eurisko-popup.service';
import { AppenderEuriskoService } from './appender-eurisko.service';

@Component({
    selector: 'jhi-appender-eurisko-dialog',
    templateUrl: './appender-eurisko-dialog.component.html'
})
export class AppenderEuriskoDialogComponent implements OnInit {

    appender: AppenderEurisko;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private appenderService: AppenderEuriskoService,
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
        if (this.appender.id !== undefined) {
            this.subscribeToSaveResponse(
                this.appenderService.update(this.appender));
        } else {
            this.subscribeToSaveResponse(
                this.appenderService.create(this.appender));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AppenderEurisko>>) {
        result.subscribe((res: HttpResponse<AppenderEurisko>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AppenderEurisko) {
        this.eventManager.broadcast({ name: 'appenderListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-appender-eurisko-popup',
    template: ''
})
export class AppenderEuriskoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appenderPopupService: AppenderEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.appenderPopupService
                    .open(AppenderEuriskoDialogComponent as Component, params['id']);
            } else {
                this.appenderPopupService
                    .open(AppenderEuriskoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
