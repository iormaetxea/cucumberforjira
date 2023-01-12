const { Given, When, Then } = require("@cucumber/cucumber");
// import expect for assertion
const { expect } = require("@playwright/test");
require('dotenv').config();

Given('I am the hotel staff', async function () {
   page.env.cms_user="itziar.ormaetxea@stay-app.com";
});

Given('I access the CMS login page', async function () {
   await page.goto(process.env.cms);
   await page.getByText("Accept all").click();
});

When('I inform correct credentials', async function () {
   await page.getByPlaceholder("username").click();
   await page.getByPlaceholder("username").fill(process.env.cms_user);
   await page.getByPlaceholder("Password").click();
   await page.getByPlaceholder("Password").fill(process.env.cms_pass);
 });

 When('I select to Sign in', async function () {
   await page.getByRole("button", { name: "SIGN IN" }).click();
 });

 Then('I am taken to the hotel dashboard', async function () {
   await expect(page.getByText("Dashboard")).toBeVisible();
 });