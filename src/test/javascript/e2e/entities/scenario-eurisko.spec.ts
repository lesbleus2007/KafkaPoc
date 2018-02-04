import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Scenario e2e test', () => {

    let navBarPage: NavBarPage;
    let scenarioDialogPage: ScenarioDialogPage;
    let scenarioComponentsPage: ScenarioComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Scenarios', () => {
        navBarPage.goToEntity('scenario-eurisko');
        scenarioComponentsPage = new ScenarioComponentsPage();
        expect(scenarioComponentsPage.getTitle())
            .toMatch(/Scenarios/);

    });

    it('should load create Scenario dialog', () => {
        scenarioComponentsPage.clickOnCreateButton();
        scenarioDialogPage = new ScenarioDialogPage();
        expect(scenarioDialogPage.getModalTitle())
            .toMatch(/Create or edit a Scenario/);
        scenarioDialogPage.close();
    });

    it('should create and save Scenarios', () => {
        scenarioComponentsPage.clickOnCreateButton();
        scenarioDialogPage.setNameInput('name');
        expect(scenarioDialogPage.getNameInput()).toMatch('name');
        scenarioDialogPage.setDescriptionInput('description');
        expect(scenarioDialogPage.getDescriptionInput()).toMatch('description');
        scenarioDialogPage.save();
        expect(scenarioDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ScenarioComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-scenario-eurisko div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class ScenarioDialogPage {
    modalTitle = element(by.css('h4#myScenarioLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
