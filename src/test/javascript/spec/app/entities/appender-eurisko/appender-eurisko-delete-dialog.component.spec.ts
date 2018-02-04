/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { KafkaPocTestModule } from '../../../test.module';
import { AppenderEuriskoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko-delete-dialog.component';
import { AppenderEuriskoService } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.service';

describe('Component Tests', () => {

    describe('AppenderEurisko Management Delete Component', () => {
        let comp: AppenderEuriskoDeleteDialogComponent;
        let fixture: ComponentFixture<AppenderEuriskoDeleteDialogComponent>;
        let service: AppenderEuriskoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [AppenderEuriskoDeleteDialogComponent],
                providers: [
                    AppenderEuriskoService
                ]
            })
            .overrideTemplate(AppenderEuriskoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppenderEuriskoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppenderEuriskoService);
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
