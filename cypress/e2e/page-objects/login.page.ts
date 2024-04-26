import BasePage from "./base.page"
import * as messages from "../../fixtures/messages.json"

class LoginPage extends BasePage {
    elements = {
        repositorySelection: () => cy.get('#repository'),
        usernameTextbox: () => cy.get('#username'),
        passwordTextbox: () => cy.get('#password'),
        loginButton: () => cy.get('.btn-login')
    }

    goto() {
        cy.visit('/TADashboard/login.jsp');
    }

    login(repositoryName: string, username: string, password: string) {
        if (repositoryName) this.elements.repositorySelection().select(repositoryName);
        if (username) this.elements.usernameTextbox().type(username);
        if (password) this.elements.passwordTextbox().type(password);
        this.elements.loginButton().click();
    }

    verifyTheErrorMessageIsDisplayed() {
        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains(messages.loginErrorMessage);
        })
    }
}

export default LoginPage;
