const { Given, When, Then } = require("@wdio/cucumber-framework");
const loginPage = require("../../pageobjects/ui/loginPage");
const BffApi = require("../../pageobjects/api/bffApi");
const dataFeedSweepstakesPage = require('../../pageobjects/ui/dataFeedApiForSweepstakes');
const sweepstakesData = require('../../../data/sweepstakesData.json');
const datafeedApiUrls = require("../../../data/dataFeedApiUrls.json");
const sweepstakesPage = require(`../../pageobjects/ui/sweepstakesPage`)
require("dotenv").config();
const fs = require("fs");



Given(/^User creates a sweepstakes consumer$/, async () => {
    datafeedApiUrls.members_api_url = process.env.Data_Feed_Api_Base_Url + "v1/data-feed/members";
    fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`, JSON.stringify(await datafeedApiUrls));
    let ApiKey = sweepstakesData.x_api_key;
    let ApiSessionKey = sweepstakesData.Session_Key;
    await dataFeedSweepstakesPage.createConsumerForSweepstakes(datafeedApiUrls.members_api_url, ApiSessionKey, ApiKey, 200);
});

Given(/^User login with Auth url with a sweepstakes user$/, async () => {
    await loginPage.openAuthUrl_signIn(sweepstakesData.Auth_URL, sweepstakesData.Auth_Username, sweepstakesData.Auth_Password);
});


When(/^User login to the application with sweepstake consumer code$/, async () => {
    await loginPage.open(sweepstakesData.consumerCode);
});

When(/^User login to the application with sweepstake consumer code with no task enrolled$/, async () => {
    //await loginPage.open("cmr-14b0b437ab5c46329fbd2f1e46fbc410");
    await loginPage.open("cmr-9ba3502387f4478ba3a3114842d31c35")
});

When(/^User get started with rewards UI$/, async () => {
    await loginPage.getStarted();
});

When(/^User enroll trivia task/, async () => {
    await sweepstakesPage.enrollTriviaTaskToPending();
});

Then(/^User select an entry and verifies the task under the pending actions$/, async () => {
    await sweepstakesPage.sweepstakesEntries();
});

Then(/^User select two entries and verifies the tasks under the pending actions$/, async () => {
    await sweepstakesPage.sweepstakesEntries();
    await sweepstakesPage.selectSecondSweepstakesEntry();
});

Then(/^User select sweepstakes entries under pending action and completes the task$/, async () => {
    await sweepstakesPage.selectEnrtyFromPendingActions()
    await sweepstakesPage.validatingEntryValuesInPendingActions();
    await sweepstakesPage.completeTaskInSweepstakes();
});

Then(/^User select sweepstakes entries under pending action and validate back button, Terms & Conditions link, icons, Entry value in the popup, Task name, CTA button$/, async () => {
    await sweepstakesPage.selectEnrtyFromPendingActions()
    await sweepstakesPage.validatingEntryValuesInPendingActions();
    await sweepstakesPage.completeTaskInSweepstakes();
});

Then(/^User select all entries under action for you and verifies the tasks under the pending actions$/, async () => {
    await sweepstakesPage.selectAllSweepsteaksEnties();
});

When(/^User enroll a sweepstake task validate task in pending section$/, async () => {
    await sweepstakesPage.sweepstakesEntries();
});

Then(/^User validates sweepstake wallet balance$/, async () => {
    await sweepstakesPage.completeTaskInSweepstakes();
});

Then(/^User navigates to all actions page and validate the message under pending section$/, async () => {
    await sweepstakesPage.showMoreActionsPage();
    await sweepstakesPage.validatingPendingActionMsg();
});

Then(/^User verifies help button in actions page$/, async () => {
    await sweepstakesPage.validateHelpBtn();
});
Then(/^User verifies Learn More button in actions page$/, async () => {
    await sweepstakesPage.validateLearnMoreBtn();
});

Then(/^User verifies Start Earning Entries label in actions page$/, async () => {
    await sweepstakesPage.validatStartEarningEntriesLabel();
});

Then(/^User navigates to all actions page and validate the message under completed section$/, async () => {
    await sweepstakesPage.validatingCompleteActionMsg();
});

Then(/^User validate pending section should not displayed when no task is enrolled$/, async () => {
    await sweepstakesPage.validatePendingActionsLandingPg();
});

Then(/^User validate recent activities section should not displayed when no task is enrolled$/, async () => {
    await sweepstakesPage.validateRecentActivitiesLandingPg();
});

Then(/^User validates the limitations of a task start date and end date and selects previous date$/, async () => {
    await sweepstakesPage.selectEnrtyFromPendingActions();
    await sweepstakesPage.validateDateRangeOfATask();
});



