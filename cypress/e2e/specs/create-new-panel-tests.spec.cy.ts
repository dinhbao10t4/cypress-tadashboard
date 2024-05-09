import { ChartSetting } from "../model/chart-setting"
import { Panel } from "../model/panel"
import * as configuration from "../../fixtures/configuration.json"
import * as panelItemPreset from "../../fixtures/panel-items.json"
import { AdministerItem } from "../enum/administer-items"
import { PanelItem } from "../enum/panel-items"
import { Series } from "../enum/series"
import { Utils } from "../utils/utils"
import LoginPage from "../page-objects/login.page"
import DashboardPage from "../page-objects/dashboard.page"
import PanelPage from "../page-objects/panel.page"

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const panelPage = new PanelPage();

describe("Create New Panel Tests", () => {
    let chartSetting: ChartSetting;
    let panel: Panel;

    beforeEach(() => {
        loginPage.goto();
        loginPage.login(configuration.repository, configuration.admin.username, configuration.admin.password);
        dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        chartSetting = new ChartSetting(Series.NAME);
        panel = new Panel("zbox_" + Utils.generateRandomString(), chartSetting);

        panelPage.openAddNewPanelForm();
        panelPage.addNewPanel(panel);
    });

    it("Verify that when 'Choose panels' form is expanded all pre-set panels are populated and sorted correctly ", () => {
        dashboardPage.openChoosePanelArea();
        dashboardPage.verifyPanelItemDataCorrectly(PanelItem.CHARTS, panelItemPreset.charts);
        dashboardPage.verifyPanelItemDataCorrectly(PanelItem.HEAT_MAPS, panelItemPreset.heatMaps);
        dashboardPage.verifyPanelItemDataCorrectly(PanelItem.INDICATORS, panelItemPreset.indicator);
        dashboardPage.verifyPanelItemDataCorrectly(PanelItem.REPORTS, panelItemPreset.reports);
    });

    afterEach(() => {
        dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        panelPage.deletePanel(panel.getName());
    });
});
