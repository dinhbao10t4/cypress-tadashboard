import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import * as configuration from "../../fixtures/configuration.json"
import * as users from "../../fixtures/users.json"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Login Tests', () => {
    beforeEach(() => {
        loginPage.goto();
    });

    it('user can login specific repository successfully via Dashboard login page with correct credentials', () => {
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
        dashboardPage.verifyDashBoardDisplays();
    });

    it("Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials", () => {
        loginPage.login(configuration.repository, users.invalidUser.username, users.invalidUser.password);
        loginPage.verifyTheErrorMessageIsDisplayed();
    });
});
