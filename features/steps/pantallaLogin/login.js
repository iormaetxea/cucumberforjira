const { Given, When, Then } = require("@cucumber/cucumber");
// import expect for assertion
const { expect } = require("@playwright/test");
Given('I am the hotel staff', function () {
   console.log('given')
  });