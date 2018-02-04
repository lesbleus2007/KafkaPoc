/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KafkaPocTestModule } from '../../../test.module';
import { LoggerEuriskoComponent } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.component';
import { LoggerEuriskoService } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.service';
import { LoggerEurisko } from '../../../../../../main/webapp/app/entities/logger-eurisko/logger-eurisko.model';

describe('Component Tests', () => {

    describe('LoggerEurisko Management Component', () => {
        let comp: LoggerEuriskoComponent;
        let fixture: ComponentFixture<LoggerEuriskoComponent>;
        let service: LoggerEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [LoggerEuriskoComponent],
                providers: [
                    LoggerEuriskoService
                ]
            })
            .overrideTemplate(LoggerEuriskoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LoggerEuriskoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LoggerEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LoggerEurisko(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.loggers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
