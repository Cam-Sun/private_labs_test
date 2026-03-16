const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I am on the login page", async function () {
  await this.page.goto(this.baseUrl);
  await this.page.waitForSelector('[data-test="login-button"]');
});

When(
  "I enter username {string} and password {string}",
  async function (username, password) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
  }
);

When("I click the login button", async function () {
  await this.page.click('[data-test="login-button"]');
});

Then("I should be on the inventory page", async function () {
  await this.page.waitForSelector(".inventory_list");
});

Then("I should see the products list", async function () {
  await expect(
    this.page.locator(".inventory_list")
  ).toBeVisible();
});

Then(
  "I should see the error message {string}",
  async function (expectedMessage) {
    const errorEl = this.page.locator('[data-test="error"]');
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText(expectedMessage);
  }
);

Then(
  "I should see an error message about incorrect credentials",
  async function () {
    const errorEl = this.page.locator('[data-test="error"]');
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText(
      "Username and password do not match any user"
    );
  }
);

Then(
  "I should see an error message about the username being required",
  async function () {
    const errorEl = this.page.locator('[data-test="error"]');
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText("Username is required");
  }
);

Then(
  "I should see an error message about the password being required",
  async function () {
    const errorEl = this.page.locator('[data-test="error"]');
    await expect(errorEl).toBeVisible();
    await expect(errorEl).toContainText("Password is required");
  }
);

When("I open the burger menu", async function () {
  await this.page.click("#react-burger-menu-btn");
});

When("I click the logout link", async function () {
  await this.page.click('[data-test="logout-sidebar-link"]');
});

Then("I should be on the login page", async function () {
  await this.page.waitForSelector('[data-test="login-button"]');
});
