import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false, // add this line
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    'embeddedScreenshots': true,
    'charts': true,
    'reportPageTitle': 'Cypress Inline Report',
    'inlineAssets': true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://localhost:60000/',
    screenshotOnRunFailure: true
  },
}); 