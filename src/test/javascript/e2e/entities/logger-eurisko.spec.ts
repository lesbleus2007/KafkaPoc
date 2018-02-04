import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Logger e2e test', () => {

    let navBarPage: NavBarPage;
    let loggerDialogPage: LoggerDialogPage;
    let loggerComponentsPage: LoggerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Loggers', () => {
        navBarPage.goToEntity('logger-eurisko');
        loggerComponentsPage = new LoggerComponentsPage();
        expect(loggerComponentsPage.getTitle())
            .toMatch(/Loggers/);

    });

    it('should load create Logger dialog', () => {
        loggerComponentsPage.clickOnCreateButton();
        loggerDialogPage = new LoggerDialogPage();
        expect(loggerDialogPage.getModalTitle())
            .toMatch(/Create or edit a Logger/);
        loggerDialogPage.close();
    });

    it('should create and save Loggers', () => {
        loggerComponentsPage.clickOnCreateButton();
        loggerDialogPage.setNameInput('name');
        expect(loggerDialogPage.getNameInput()).toMatch('name');
        loggerDialogPage.setBurstCountInput('5');
        expect(loggerDialogPage.getBurstCountInput()).toMatch('5');
        loggerDialogPage.setBurstFrequencyInput('5');
        expect(loggerDialogPage.getBurstFrequencyInput()).toMatch('5');
        loggerDialogPage.scenarioSelectLastOption();
        loggerDialogPage.appenderSelectLastOption();
        loggerDialogPage.save();
        expect(loggerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LoggerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-logger-eurisko div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class LoggerDialogPage {
    modalTitle = element(by.css('h4#myLoggerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    burstCountInput = element(by.css('input#field_burstCount'));
    burstFrequencyInput = element(by.css('input#field_burstFrequency'));
    scenarioSelect = element(by.css('select#field_scenario'));
    appenderSelect = element(by.css('select#field_appender'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setBurstCountInput = function(burstCount) {
        this.burstCountInput.sendKeys(burstCount);
    };

    getBurstCountInput = function() {
        return this.burstCountInput.getAttribute('value');
    };

    setBurstFrequencyInput = function(burstFrequency) {
        this.burstFrequencyInput.sendKeys(burstFrequency);
    };

    getBurstFrequencyInput = function() {
        return this.burstFrequencyInput.getAttribute('value');
    };

    scenarioSelectLastOption = function() {
        this.scenarioSelect.all(by.tagName('option')).last().click();
    };

    scenarioSelectOption = function(option) {
        this.scenarioSelect.sendKeys(option);
    };

    getScenarioSelect = function() {
        return this.scenarioSelect;
    };

    getScenarioSelectedOption = function() {
        return this.scenarioSelect.element(by.css('option:checked')).getText();
    };

    appenderSelectLastOption = function() {
        this.appenderSelect.all(by.tagName('option')).last().click();
    };

    appenderSelectOption = function(option) {
        this.appenderSelect.sendKeys(option);
    };

    getAppenderSelect = function() {
        return this.appenderSelect;
    };

    getAppenderSelectedOption = function() {
        return this.appenderSelect.element(by.css('option:checked')).getText();
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
