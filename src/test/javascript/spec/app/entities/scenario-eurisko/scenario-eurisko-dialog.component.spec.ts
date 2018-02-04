/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KafkaPocTestModule } from '../../../test.module';
import { ScenarioEuriskoDialogComponent } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko-dialog.component';
import { ScenarioEuriskoService } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.service';
import { ScenarioEurisko } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.model';

describe('Component Tests', () => {

    describe('ScenarioEurisko Management Dialog Component', () => {
        let comp: ScenarioEuriskoDialogComponent;
        let fixture: ComponentFixture<ScenarioEuriskoDialogComponent>;
        let service: ScenarioEuriskoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [ScenarioEuriskoDialogComponent],
                providers: [
                    ScenarioEuriskoService
                ]
            })
            .overrideTemplate(ScenarioEuriskoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScenarioEuriskoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScenarioEuriskoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ScenarioEurisko(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.scenario = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'scenarioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ScenarioEurisko();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.scenario = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'scenarioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
