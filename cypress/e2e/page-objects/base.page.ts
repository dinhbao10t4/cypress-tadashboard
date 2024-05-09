class BasePage {
    baseElements = {
        accountTab : () => cy.get("a[href='#Welcome']"),
        logoutButton : () => cy.get("a[href='logout.do']")
    }

    logout() {
        this.baseElements.accountTab().realHover();
        this.baseElements.logoutButton().realClick();
    }
}

export default BasePage;
