const { Given, When, Then } = require("@cucumber/cucumber");
// import expect for assertion
const { expect } = require("@playwright/test");
require('dotenv').config();

Given('I am the hotel staff', async function () {
   await page.goto(process.env.cms);
   await page.getByText("Accept all").click();
});

Given('I access the CMS login page', async function () {
   await page.getByPlaceholder("username").click();
   await page.getByPlaceholder("username").fill(process.env.cms_user);
   await page.getByPlaceholder("Password").click();
   await page.getByPlaceholder("Password").fill(process.env.cms_pass);
   await page.getByRole("button", { name: "SIGN IN" }).click();
});