const {
  Before,
  BeforeAll,
  AfterAll,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
//const { chromium } = require("playwright");
const {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
  devices,
} = require("@playwright/test");
const {
  Restaurants
} = require('./features/page_objects/Restaurants');
require('dotenv').config();

setDefaultTimeout(60000);

const fs = require("fs");
const videos = './reports/videos'

// launch the browser
BeforeAll(async function () {
  //delete videos directory
  fs.rm(videos, { recursive: true, force: true }, (err) => {
    if (err) {
      throw err;
    }
  });


  if (process.env.BROWSER == "webkit") {
    global.browser = await webkit.launch({
      headless: false,
      slowMo: 1000,
      video: "retain-on-failure",
    });
  } else if (process.env.BROWSER == "firefox") {
    global.browser = await firefox.launch({
      headless: false,
      slowMo: 1000,
      video: "retain-on-failure",
    });
  } else {
    global.browser = await chromium.launch({
      headless: false,
      slowMo: 1000,
      video: "retain-on-failure",
    });
  }
});

// close the browser
AfterAll(async function () {
  await global.browser.close();
});

// Create a new browser context and page per scenario
Before(async function (scenario) {
  //global.context = await global.browser.newContext({
  //  ...devices[process.env.DEVICE],
  //  recordVideo: {
  //    dir: videos,
  //  }
  //});
  //global.page = await global.context.newPage();

  let featureName = scenario.gherkinDocument.feature.name;
  let scenarioName = scenario.pickle.name;
  let timestamp = '';

  global.context = await global.browser.newContext({
    ...devices[process.env.DEVICE],
    recordVideo: {
      dir: 'reports/videos/' + scenario.gherkinDocument.feature.name + '/' + scenario.gherkinDocument.feature.name + ' - ' + scenario.pickle.name,
    }
  });
  global.page = await global.context.newPage();
  global.featureName = featureName;
  global.scenarioName = scenarioName;
  global.timestamp = new Date().getTime();
});

// Cleanup after each scenario
After(async function (testInfo) {
  await global.page.close();
  await global.context.close();

  const videoFilePath = await global.page.video().path();
  const newVideoPath = `./reports/videos/${global.featureName}: ${global.scenarioName}.webm`;
  try {
    await fs.renameSync(videoFilePath, newVideoPath);
  } catch (e) {
    console.error(e);
    console.log(`"${videoFilePath}" -> "${newVideoPath}" rename failed`);
    };

});
