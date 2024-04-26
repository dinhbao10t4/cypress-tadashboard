import BasePage from "./base.page"

class DashboardPage extends BasePage {
    elements = {

        overviewMainMenu : () => cy.contains('Overview'),
    }

    verifyDashBoardDisplays() {
        this.elements.overviewMainMenu().should('be.visible');
        cy.title().should('include', 'Execution Dashboard');
    }
}

export default DashboardPage;