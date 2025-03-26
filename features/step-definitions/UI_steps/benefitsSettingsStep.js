const { Given, When, Then } = require("@wdio/cucumber-framework");
const benefitsSettingPage = require("../../pageobjects/ui/benefitsSettingsPage");
require("dotenv").config();

Then(/^user validates profile name and mail id of the consumer$/, async() => {
	await benefitsSettingPage.profileNameVal();
    await benefitsSettingPage.mailIdVal();
});

Then(/^user validates personal link under settings$/, async() => {
	await benefitsSettingPage.personalLinkVal();
    await benefitsSettingPage.navigateToSettingsPage();
});

Then(/^user validates notification link under settings$/, async() => {
	await benefitsSettingPage.notificationsTextVal();
    await benefitsSettingPage.notificationLinkVal();
});

Then(/^user validates device link under settings$/, async() => {
	await benefitsSettingPage.devicesTextVal();
    await benefitsSettingPage.devicesLinkeVal();
});

Then(/^user validates manage card link under settings$/, async() => {
	await benefitsSettingPage.manageCardTextVal();
    await benefitsSettingPage.manageCardLinkeVal();
});