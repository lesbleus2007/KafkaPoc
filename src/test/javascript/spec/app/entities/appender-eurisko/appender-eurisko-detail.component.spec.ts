/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KafkaPocTestModule } from '../../../test.module';
import { AppenderEuriskoDetailComponent } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko-detail.component';
import { AppenderEuriskoService } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.service';
import { AppenderEurisko } from '../../../../../../main/webapp/app/entities/appender-eurisko/appender-eurisko.model';

describe('Component Tests', () => {

    describe('AppenderEurisko Management Detail Component', () => {
        let comp: AppenderEuriskoDetailComponent;
        let fixture: ComponentFixture<AppenderEuriskoDetailComponent>;
        let service: AppenderEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [AppenderEuriskoDetailComponent],
                providers: [
                    AppenderEuriskoService
                ]
            })
            .overrideTemplate(AppenderEuriskoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppenderEuriskoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AppenderEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AppenderEurisko(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.appender).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
