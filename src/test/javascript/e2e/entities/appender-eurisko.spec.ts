import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Appender e2e test', () => {

    let navBarPage: NavBarPage;
    let appenderDialogPage: AppenderDialogPage;
    let appenderComponentsPage: AppenderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Appenders', () => {
        navBarPage.goToEntity('appender-eurisko');
        appenderComponentsPage = new AppenderComponentsPage();
        expect(appenderComponentsPage.getTitle())
            .toMatch(/Appenders/);

    });

    it('should load create Appender dialog', () => {
        appenderComponentsPage.clickOnCreateButton();
        appenderDialogPage = new AppenderDialogPage();
        expect(appenderDialogPage.getModalTitle())
            .toMatch(/Create or edit a Appender/);
        appenderDialogPage.close();
    });

    it('should create and save Appenders', () => {
        appenderComponentsPage.clickOnCreateButton();
        appenderDialogPage.setNameInput('name');
        expect(appenderDialogPage.getNameInput()).toMatch('name');
        appenderDialogPage.getIsAsyncInput().isSelected().then((selected) => {
            if (selected) {
                appenderDialogPage.getIsAsyncInput().click();
                expect(appenderDialogPage.getIsAsyncInput().isSelected()).toBeFalsy();
            } else {
                appenderDialogPage.getIsAsyncInput().click();
                expect(appenderDialogPage.getIsAsyncInput().isSelected()).toBeTruthy();
            }
        });
        appenderDialogPage.setTopicInput('topic');
        expect(appenderDialogPage.getTopicInput()).toMatch('topic');
        appenderDialogPage.save();
        expect(appenderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AppenderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-appender-eurisko div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class AppenderDialogPage {
    modalTitle = element(by.css('h4#myAppenderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    isAsyncInput = element(by.css('input#field_isAsync'));
    topicInput = element(by.css('input#field_topic'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    getIsAsyncInput = function() {
        return this.isAsyncInput;
    };
    setTopicInput = function(topic) {
        this.topicInput.sendKeys(topic);
    };

    getTopicInput = function() {
        return this.topicInput.getAttribute('value');
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
