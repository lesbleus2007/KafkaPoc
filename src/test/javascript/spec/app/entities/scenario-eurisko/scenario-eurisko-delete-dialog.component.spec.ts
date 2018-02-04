/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KafkaPocTestModule } from '../../../test.module';
import { ScenarioEuriskoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko-delete-dialog.component';
import { ScenarioEuriskoService } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.service';

describe('Component Tests', () => {

    describe('ScenarioEurisko Management Delete Component', () => {
        let comp: ScenarioEuriskoDeleteDialogComponent;
        let fixture: ComponentFixture<ScenarioEuriskoDeleteDialogComponent>;
        let service: ScenarioEuriskoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [ScenarioEuriskoDeleteDialogComponent],
                providers: [
                    ScenarioEuriskoService
                ]
            })
            .overrideTemplate(ScenarioEuriskoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScenarioEuriskoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScenarioEuriskoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
