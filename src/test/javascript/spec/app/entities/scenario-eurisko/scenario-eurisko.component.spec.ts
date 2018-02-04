/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { KafkaPocTestModule } from '../../../test.module';
import { ScenarioEuriskoComponent } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.component';
import { ScenarioEuriskoService } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.service';
import { ScenarioEurisko } from '../../../../../../main/webapp/app/entities/scenario-eurisko/scenario-eurisko.model';

describe('Component Tests', () => {

    describe('ScenarioEurisko Management Component', () => {
        let comp: ScenarioEuriskoComponent;
        let fixture: ComponentFixture<ScenarioEuriskoComponent>;
        let service: ScenarioEuriskoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [KafkaPocTestModule],
                declarations: [ScenarioEuriskoComponent],
                providers: [
                    ScenarioEuriskoService
                ]
            })
            .overrideTemplate(ScenarioEuriskoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScenarioEuriskoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScenarioEuriskoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ScenarioEurisko(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.scenarios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
