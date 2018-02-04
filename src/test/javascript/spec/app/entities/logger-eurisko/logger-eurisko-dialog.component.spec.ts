/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KafkaPocTestModule } from '../../../test.module';
import { LoggerEuriskoDialogComponent } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko-dialog.component';
import { LoggerEuriskoService } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.service';
import { LoggerEurisko } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.model';
import { ScenarioEuriskoService } from '../../../../../../main/webapp/app/entities/scenario-eurisko';
import { AppenderEuriskoService } from '../../../../../../main/webapp/app/entities/appender-eurisko';

describe('Component Tests', () => {

    describe('LoggerEurisko Management Dialog Component', () => {
        let comp: LoggerEuriskoDialogComponent;
        let fixture: ComponentFixture<LoggerEuriskoDialogComponent>;
        let service: LoggerEuriskoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [LoggerEuriskoDialogComponent],
                providers: [
                    ScenarioEuriskoService,
                    AppenderEuriskoService,
                    LoggerEuriskoService
                ]
            })
            .overrideTemplate(LoggerEuriskoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoggerEuriskoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoggerEuriskoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LoggerEurisko(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.logger = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'loggerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LoggerEurisko();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.logger = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'loggerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
