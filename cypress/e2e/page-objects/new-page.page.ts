import BasePage from "./base.page"
import {Utils} from "../utils/utils";
import { MainPage } from "../model/main-page";

class NewPage extends BasePage {
    elements = {
        newPageNameTextbox: () => cy.get("#name"),
        parentPageSelection: () => cy.get("#parent"),
        numberOfColumnSelection: () => cy.get("#columnnumber"),
        displayAfterSelection: () => cy.get("#afterpage"),
        publicCheckbox: () => cy.get("#ispublic"),
        okButton: () => cy.get("#OK")
    }

    createNewPage(mainPage: MainPage, newpageName?: string, parentPage?: string, numberOfColumn?: string, displayAfter?: string, isPublic?: boolean) {
        this.elements.newPageNameTextbox().type(mainPage.getName());
        if (!Utils.isEmpty(mainPage.getParentPage()) && mainPage.getParentPage() != undefined) {
            this.elements.parentPageSelection().select(mainPage.getParentPage());
        }
        if (!Utils.isEmpty(mainPage.getNumberOfColumn()) && mainPage.getNumberOfColumn() != undefined) {
            this.elements.numberOfColumnSelection().select(mainPage.getNumberOfColumn());
        }
        if (!Utils.isEmpty(mainPage.getDisplayAfter()) && mainPage.getDisplayAfter() != undefined) {
            this.elements.displayAfterSelection().select(mainPage.getDisplayAfter());
        }
        if (mainPage.isPublic() != null && mainPage.isPublic() != undefined) {
            this.elements.publicCheckbox().check();
        }
        this.elements.okButton().click();
    }
}

export default NewPage;