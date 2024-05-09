import * as configuration from "../../fixtures/configuration.json"
import * as users from "../../fixtures/users.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"
import { Constants } from "../utils/constants"
import { MainPage } from "../model/main-page"
import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import NewPage from "../page-objects/new-page.page"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const newPage = new NewPage();

describe("Create New Page Tests", () => {
    let mainPage: MainPage;
    
    beforeEach(() => {
        mainPage = new MainPage(Utils.generateRandomString(), Constants.EMPTY_STRING, Constants.EMPTY_STRING, Constants.EMPTY_STRING, true);
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
        Utils.delay();
        dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        newPage.createNewPage(mainPage);
    });
    
    it("Verify that Public pages can be visible and accessed by all users of working repository", () => {
        dashboardPage.goToMainPage(mainPage.getName());
        dashboardPage.verifyMainPageDisplays(mainPage.getName());

        // logout and login with new account
        dashboardPage.logout();
        loginPage.login(configuration.repository, users.johnUser.username, users.johnUser.password);
        dashboardPage.goToMainPage(mainPage.getName());
        dashboardPage.verifyMainPageDisplays(mainPage.getName());
    });

    afterEach(() => {
        // logout and login with admin
        dashboardPage.logout();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);

        //delete new page
        dashboardPage.goToMainPage(mainPage.getName());
        Utils.delay();
        dashboardPage.deleteCurrentPage();
    });
});
