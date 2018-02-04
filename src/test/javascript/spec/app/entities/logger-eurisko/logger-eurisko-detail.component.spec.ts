/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KafkaPocTestModule } from '../../../test.module';
import { LoggerEuriskoDetailComponent } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko-detail.component';
import { LoggerEuriskoService } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.service';
import { LoggerEurisko } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.model';

describe('Component Tests', () => {

    describe('LoggerEurisko Management Detail Component', () => {
        let comp: LoggerEuriskoDetailComponent;
        let fixture: ComponentFixture<LoggerEuriskoDetailComponent>;
        let service: LoggerEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [LoggerEuriskoDetailComponent],
                providers: [
                    LoggerEuriskoService
                ]
            })
            .overrideTemplate(LoggerEuriskoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoggerEuriskoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoggerEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LoggerEurisko(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.logger).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
