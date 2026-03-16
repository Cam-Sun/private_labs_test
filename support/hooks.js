const { Before, After, Given, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(30000);

Before(async function () {
  await this.openBrowser();
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    const screenshot = await this.page?.screenshot();
    if (screenshot) {
      this.attach(screenshot, "image/png");
    }
  }
  await this.closeBrowser();
});

// Shared login step used across features
Given("I am logged in as {string}", async function (username) {
  await this.login(username);
});
