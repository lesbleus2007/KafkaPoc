import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoggerEurisko } from './logger-eurisko.model';
import { LoggerEuriskoPopupService } from './logger-eurisko-popup.service';
import { LoggerEuriskoService } from './logger-eurisko.service';

@Component({
    selector: 'jhi-logger-eurisko-delete-dialog',
    templateUrl: './logger-eurisko-delete-dialog.component.html'
})
export class LoggerEuriskoDeleteDialogComponent {

    logger: LoggerEurisko;

    constructor(
        private loggerService: LoggerEuriskoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.loggerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'loggerListModification',
                content: 'Deleted an logger'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-logger-eurisko-delete-popup',
    template: ''
})
export class LoggerEuriskoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private loggerPopupService: LoggerEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.loggerPopupService
                .open(LoggerEuriskoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
