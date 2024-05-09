import * as configuration from "../../fixtures/configuration.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"
import { MainPage } from "../model/main-page"
import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import NewPage from "../page-objects/new-page.page"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const newPage = new NewPage();

describe("Delete Page Tests", () => {
    beforeEach(() => {
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
    });
    
    it("Verify that user can remove any main parent page except Overview page successfully and the order of pages stays persistent as long as there is not children page under it", () => {
        let parentPage = new MainPage(Utils.generateRandomString());
        let childPage = new MainPage(Utils.generateRandomString(), parentPage.getName());

        dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        newPage.createNewPage(parentPage);
        dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        newPage.createNewPage(childPage);

        // delete the parent page which has child page
        dashboardPage.goToMainPage(parentPage.getName());
        dashboardPage.deleteCurrentPage();
        dashboardPage.verifyTheMessageWhenDeletingPageThatHasChildPage(parentPage.getName());

        // delete the child page
        dashboardPage.goToChildPage(childPage.getName(), childPage.getParentPage());
        dashboardPage.deleteCurrentPage();
        dashboardPage.verifyChildPageDelete(childPage.getName(), childPage.getParentPage());

        // delete the main page
        dashboardPage.goToMainPage(parentPage.getName());
        dashboardPage.deleteCurrentPage();
        dashboardPage.verifyMainPageDelete(parentPage.getName());
    });
});
