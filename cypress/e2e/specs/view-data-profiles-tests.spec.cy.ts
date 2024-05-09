import * as configuration from "../../fixtures/configuration.json"
import { AdministerItem } from "../enum/administer-items";

import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import DataProfilesPage from "../page-objects/data-profiles.page"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const dataProfilesPage = new DataProfilesPage();

describe("View Data Profiles Tests", () => {
    beforeEach(() => {
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
        dashboardPage.goToAdministerItemPage(AdministerItem.DATA_PROFILES);
    });

    it("Verify that all Pre-set Data Profiles are populated correctly", async () => {
        await dataProfilesPage.verifyPreSetDataProfilesArePopulatedCorrectly();
    });

    it("Verify that Data Profiles are listed alphabetically", async () => {
        await dataProfilesPage.verifyDataProfilesAreListedAlphabetically();
    });
});