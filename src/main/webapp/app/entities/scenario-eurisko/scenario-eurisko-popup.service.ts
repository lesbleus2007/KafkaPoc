import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ScenarioEurisko } from './scenario-eurisko.model';
import { ScenarioEuriskoService } from './scenario-eurisko.service';

@Injectable()
export class ScenarioEuriskoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private scenarioService: ScenarioEuriskoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.scenarioService.find(id)
                    .subscribe((scenarioResponse: HttpResponse<ScenarioEurisko>) => {
                        const scenario: ScenarioEurisko = scenarioResponse.body;
                        this.ngbModalRef = this.scenarioModalRef(component, scenario);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scenarioModalRef(component, new ScenarioEurisko());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scenarioModalRef(component: Component, scenario: ScenarioEurisko): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scenario = scenario;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
