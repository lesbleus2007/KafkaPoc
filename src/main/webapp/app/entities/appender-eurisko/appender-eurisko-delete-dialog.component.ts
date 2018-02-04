import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppenderEurisko } from './appender-eurisko.model';
import { AppenderEuriskoPopupService } from './appender-eurisko-popup.service';
import { AppenderEuriskoService } from './appender-eurisko.service';

@Component({
    selector: 'jhi-appender-eurisko-delete-dialog',
    templateUrl: './appender-eurisko-delete-dialog.component.html'
})
export class AppenderEuriskoDeleteDialogComponent {

    appender: AppenderEurisko;

    constructor(
        private appenderService: AppenderEuriskoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.appenderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'appenderListModification',
                content: 'Deleted an appender'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-appender-eurisko-delete-popup',
    template: ''
})
export class AppenderEuriskoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appenderPopupService: AppenderEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.appenderPopupService
                .open(AppenderEuriskoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
