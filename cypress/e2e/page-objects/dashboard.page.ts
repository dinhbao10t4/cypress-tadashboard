import BasePage from "./base.page"
import { GlobalSetting } from "../enum/global-settings"
import * as messages from "../../fixtures/messages.json"
import { format } from 'util';
import {Utils} from "../utils/utils";

class DashboardPage extends BasePage {
    elements = {
        globalSettingsButton : () => cy.get("#main-menu > div[class='container'] > ul > li[class='mn-setting']"),
        overviewMainMenu : () => cy.contains('Overview'),
        administerOption : () => cy.contains('Administer'),
        administerTab: () => cy.get("a[href='#Administer']"),
        choosePanelButton: () => cy.get("#btnChoosepanel")
    }

    verifyDashBoardDisplays() {
        this.elements.overviewMainMenu().should('be.visible');
        cy.title().should('include', 'Execution Dashboard');
    }

    verifyGlobalSettingsButtonDisplays() {
        this.elements.globalSettingsButton().should('be.visible');
    }

    hoverGlobalSettingsButton() {
        this.elements.globalSettingsButton().realHover();
    }

    goToGlobalSettingsFeature(featureName: string) {
        this.hoverGlobalSettingsButton();
        cy.get('a').contains(featureName).click();
    }

    goToMainPage(pageName: string) {
        cy.get('a').contains(pageName).click();
    }

    verifyMainPageDisplays(pageName: string) {
        cy.get('a').contains(pageName).should('be.visible');
        cy.title().should('include', pageName);
    }

    deleteCurrentPage() {
        this.goToGlobalSettingsFeature(GlobalSetting.DELETE);
    }

    verifyTheMessageWhenDeletingPageThatHasChildPage(pageName: string) {
        cy.on('window:alert', (str) => {
            expect(str.trim()).to.equal(format(messages.deletePageWarningMessage, pageName));
        });
        cy.on('window:confirm', () => true);
    }

    goToChildPage(childPageName: string, parentPageName: string) {
        cy.get('a').contains(parentPageName).realHover();
        cy.get('a').contains(childPageName).realClick();
    }

    verifyChildPageDelete(childPageName: string, parentPageName: string) {
        cy.get('a').contains(parentPageName).realHover();
        cy.get('a').contains(childPageName).should('not.exist');
    }

    verifyMainPageDelete(pageName: string) {
        cy.get('a').contains(pageName).should('not.exist');
    }

    goToAdministerItemPage(item: string) {
        cy.get("ul[id='ulAdminister'] > li > a").contains(item).click({ force: true });
    }

    openChoosePanelArea() {
        Utils.delay();
        this.elements.overviewMainMenu().click();
        this.elements.choosePanelButton().click();
    }

    verifyPanelItemDataCorrectly(panelItem: string, panelItemPresetArr: string[]) {
        let isSorted = false;
        let isPanelItemPresetCorrect = true;

        //Collect the items then assert the list
        let items: string[] = [];
        cy.get('div').contains(panelItem).siblings('table').find('tbody > tr > td > ul > li > a')
        .each(($a) => items.push($a.text())).then(() => {
            isSorted = Utils.isStringArraySorted(items);
            
            for (var val of panelItemPresetArr) {
                if (items.includes(Utils.replacingSpacesWithNbsp(val)) == false) {
                    isPanelItemPresetCorrect = false;
                    break;
                }
            }

            expect(isSorted && isPanelItemPresetCorrect).to.be.true;
        });
    }
}


export default DashboardPage;