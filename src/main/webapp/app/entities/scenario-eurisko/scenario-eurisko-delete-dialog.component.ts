import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ScenarioEurisko } from './scenario-eurisko.model';
import { ScenarioEuriskoPopupService } from './scenario-eurisko-popup.service';
import { ScenarioEuriskoService } from './scenario-eurisko.service';

@Component({
    selector: 'jhi-scenario-eurisko-delete-dialog',
    templateUrl: './scenario-eurisko-delete-dialog.component.html'
})
export class ScenarioEuriskoDeleteDialogComponent {

    scenario: ScenarioEurisko;

    constructor(
        private scenarioService: ScenarioEuriskoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scenarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scenarioListModification',
                content: 'Deleted an scenario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scenario-eurisko-delete-popup',
    template: ''
})
export class ScenarioEuriskoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scenarioPopupService: ScenarioEuriskoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scenarioPopupService
                .open(ScenarioEuriskoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
