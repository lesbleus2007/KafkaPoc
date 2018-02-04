/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KafkaPocTestModule } from '../../../test.module';
import { AppenderEuriskoComponent } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.component';
import { AppenderEuriskoService } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.service';
import { AppenderEurisko } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.model';

describe('Component Tests', () => {

    describe('AppenderEurisko Management Component', () => {
        let comp: AppenderEuriskoComponent;
        let fixture: ComponentFixture<AppenderEuriskoComponent>;
        let service: AppenderEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [AppenderEuriskoComponent],
                providers: [
                    AppenderEuriskoService
                ]
            })
            .overrideTemplate(AppenderEuriskoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppenderEuriskoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppenderEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AppenderEurisko(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.appenders[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
