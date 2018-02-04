/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KafkaPocTestModule } from '../../../test.module';
import { LoggerEuriskoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko-delete-dialog.component';
import { LoggerEuriskoService } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.service';

describe('Component Tests', () => {

    describe('LoggerEurisko Management Delete Component', () => {
        let comp: LoggerEuriskoDeleteDialogComponent;
        let fixture: ComponentFixture<LoggerEuriskoDeleteDialogComponent>;
        let service: LoggerEuriskoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [LoggerEuriskoDeleteDialogComponent],
                providers: [
                    LoggerEuriskoService
                ]
            })
            .overrideTemplate(LoggerEuriskoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoggerEuriskoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoggerEuriskoService);
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
