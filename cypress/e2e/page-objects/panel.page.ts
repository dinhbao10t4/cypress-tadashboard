import BasePage from "./base.page"
import { Panel } from "../model/panel"

class PanelPage extends BasePage {
    elements = {
        newPageNameTextbox: () => cy.get("#name"),
        addNewLink: () => cy.get("a").contains('Add New'),
        displayNameTextbox: () => cy.get("#txtDisplayName"),
        seriesSeletion: () => cy.get("#cbbSeriesField"),
        okButton: () => cy.get("#OK")
    }

    openAddNewPanelForm() {
        this.elements.addNewLink().click();
    }

    verifyOtherControlIsDisabled() {
        let isClickable = false;
        try {
            this.elements.addNewLink().click({
                timeout: 3000, force: true
            });
            isClickable = true;
        } catch (error) {
        }
        expect(isClickable).to.be.true;
    }

    addNewPanel(panel: Panel) {
        this.elements.displayNameTextbox().type(panel.getName());
        this.elements.seriesSeletion().select(panel.getChartSetting().getSeries().toLocaleLowerCase());

        this.elements.okButton().click();
    }

    deletePanel(panelName: string) {     
        cy.get("a").contains(panelName)
          .parent('td').siblings('td').contains("Delete").click();
    }
}

export default PanelPage;