import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AppenderEurisko } from './appender-eurisko.model';
import { AppenderEuriskoService } from './appender-eurisko.service';

@Component({
    selector: 'jhi-appender-eurisko-detail',
    templateUrl: './appender-eurisko-detail.component.html'
})
export class AppenderEuriskoDetailComponent implements OnInit, OnDestroy {

    appender: AppenderEurisko;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private appenderService: AppenderEuriskoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAppenders();
    }

    load(id) {
        this.appenderService.find(id)
            .subscribe((appenderResponse: HttpResponse<AppenderEurisko>) => {
                this.appender = appenderResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAppenders() {
        this.eventSubscriber = this.eventManager.subscribe(
            'appenderListModification',
            (response) => this.load(this.appender.id)
        );
    }
}
