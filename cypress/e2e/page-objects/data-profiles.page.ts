import BasePage from "./base.page"
import Table from "../element/table"
import * as dataProfileData from "../../fixtures/data-profiles.json"
import { Utils } from "../utils/utils"
import { GeneralSetting } from "../model/general-setting"

class DataProfilesPage extends BasePage {
    private readonly DATA_PROFILE_HEADER: string = "Data Profile";
    private dataProfileTable: Table = new Table();

    elements = {
        addNewDataLink : () => cy.get("#ccontent a").contains('Add New'),
        settingNameTextbox : () => cy.get("#txtProfileName"),
        settingTypeSelection : () => cy.get("#cbbEntityType"),
        settingRelatedDataSelection : () => cy.get("#cbbSubReport"),
        fieldSelection : () => cy.get("#cbbFields"),
        addLevelButton : () => cy.get("#btnAddSortField")
    };

    async verifyPreSetDataProfilesArePopulatedCorrectly() {
        let result = true;
        const items = await this.dataProfileTable.getColumnDataByColumnHeader(this.DATA_PROFILE_HEADER);
        for (var val of dataProfileData.dataProfilesPreSet) {
            if (items.result.includes(Utils.replacingSpacesWithNbsp(val)) == false) {
                result = false;
                break;
            }
        }

        expect(result).to.be.true;        
    }

    async verifyDataProfilesAreListedAlphabetically() {
        const items = await this.dataProfileTable.getColumnDataByColumnHeader(this.DATA_PROFILE_HEADER);
        let result = Utils.isStringArraySorted(items.result);
        expect(result).to.be.true;
    }

    goToAddNewDataProfileForm() {
        this.elements.addNewDataLink().click();
    }

    fillGeneralSetting(generalSetting: GeneralSetting) {
        this.elements.settingNameTextbox().type(generalSetting.getName());

        if (!Utils.isEmpty(generalSetting.getItemType()) && generalSetting.getItemType() != undefined) {
            this.elements.settingTypeSelection().select(generalSetting.getItemType());
        }

        if (!Utils.isEmpty(generalSetting.getRelatedData()) && generalSetting.getRelatedData() != undefined) {
            this.elements.settingRelatedDataSelection().select(generalSetting.getRelatedData());
        }

        this.clickNextButton();
    }

    clickNextButton() {
        cy.get("table > tbody > tr > td > input[value='Next']").click();
    }

    fillDisplayField() {
        // TODO
        this.clickNextButton();
    }

    addLevel(field: string) {
        this.elements.fieldSelection().select(field);
        this.elements.addLevelButton().click();
    }

    verifyLevelAdded(field: string) {
        cy.get("table[id='profilesettings'] > tbody > tr > td > span").contains(field).should('be.visible');
    }
}

export default DataProfilesPage;
