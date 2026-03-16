const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.baseUrl = process.env.BASE_URL || "http://localhost:3000";
  }

  async openBrowser() {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS !== "false",
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(30000);
  }

  async closeBrowser() {
    await this.context?.close();
    await this.browser?.close();
  }

  async login(username, password = "secret_sauce") {
    await this.page.goto(this.baseUrl);
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
    await this.page.waitForURL(`${this.baseUrl}/inventory.html`);
  }
}

setWorldConstructor(CustomWorld);
