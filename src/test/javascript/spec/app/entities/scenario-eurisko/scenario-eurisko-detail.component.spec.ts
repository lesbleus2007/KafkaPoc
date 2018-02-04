/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { KafkaPocTestModule } from '../../../test.module';
import { ScenarioEuriskoDetailComponent } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko-detail.component';
import { ScenarioEuriskoService } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.service';
import { ScenarioEurisko } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.model';

describe('Component Tests', () => {

    describe('ScenarioEurisko Management Detail Component', () => {
        let comp: ScenarioEuriskoDetailComponent;
        let fixture: ComponentFixture<ScenarioEuriskoDetailComponent>;
        let service: ScenarioEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [ScenarioEuriskoDetailComponent],
                providers: [
                    ScenarioEuriskoService
                ]
            })
            .overrideTemplate(ScenarioEuriskoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScenarioEuriskoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScenarioEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ScenarioEurisko(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.scenario).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
