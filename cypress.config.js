const { defineConfig } = require("cypress");
const {beforeRunHook, afterRunHook,} = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  experimentalWebKitSupport: true,
  reporter: "cypress-mochawesome-reporter",
  video: false,
  reporterOptions: {
    //reportDir: "cypress/report",
    charts: true,
    reportPageTitle: "Cypress Inline Reporter",
    embeddedScreenshots: true,
    inlineAssets: true, //Adds the asserts inline
  },
  e2e: {
    baseUrl: "https://sure-qa-challenge.vercel.app",
    setupNodeEvents(on, config) {
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });
      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
      require("cypress-mochawesome-reporter/plugin")(on);
      this.screenshotOnRunFailure = true;
    },
  },
});
