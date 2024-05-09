import * as configuration from "../../fixtures/configuration.json"
import { AdministerItem } from "../enum/administer-items";
import { Field } from "../enum/field";

import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import DataProfilesPage from "../page-objects/data-profiles.page"
import { GeneralSetting } from "../model/general-setting"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const dataProfilesPage = new DataProfilesPage();

describe("View Data Profiles Tests", () => {
    beforeEach(() => {
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
        dashboardPage.goToAdministerItemPage(AdministerItem.DATA_PROFILES);
    });

    it("Verify that user is able to add levels of fields ", () => {
        let generalSetting = new GeneralSetting("Test");
        dataProfilesPage.goToAddNewDataProfileForm();
        dataProfilesPage.fillGeneralSetting(generalSetting);
        dataProfilesPage.fillDisplayField();
        
        dataProfilesPage.addLevel(Field.NAME);
        dataProfilesPage.verifyLevelAdded(Field.NAME);

        dataProfilesPage.addLevel(Field.LOCATION);
        dataProfilesPage.verifyLevelAdded(Field.LOCATION);
    });
});

