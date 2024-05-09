import * as configuration from "../../fixtures/configuration.json"
import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import PanelPage from "../page-objects/panel.page"
import { AdministerItem } from "../enum/administer-items"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const panelPage = new PanelPage();

describe("Panel Page Tests", () => {
    beforeEach(() => {
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
    });

    it("Verify that when 'Add New Panel' form is on focused all other control/form is disabled or locked.", () => {
        dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        panelPage.openAddNewPanelForm();
        panelPage.verifyOtherControlIsDisabled();
    });
});
