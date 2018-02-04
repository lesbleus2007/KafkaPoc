import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LoggerEurisko } from './logger-eurisko.model';
import { LoggerEuriskoService } from './logger-eurisko.service';

@Component({
    selector: 'jhi-logger-eurisko-detail',
    templateUrl: './logger-eurisko-detail.component.html'
})
export class LoggerEuriskoDetailComponent implements OnInit, OnDestroy {

    logger: LoggerEurisko;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private loggerService: LoggerEuriskoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLoggers();
    }

    load(id) {
        this.loggerService.find(id)
            .subscribe((loggerResponse: HttpResponse<LoggerEurisko>) => {
                this.logger = loggerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLoggers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'loggerListModification',
            (response) => this.load(this.logger.id)
        );
    }
}
