const { When, Then } = require("@wdio/cucumber-framework");
const RedApi = require("../../pageobjects/api/redemptionApi");
const utilTools = require("../../../utils/tools");
require("dotenv").config();


When(/^User checks balance amount with balance Api and launches the prizeout success$/, async() => {
    await RedApi.balanceApi();
    await RedApi.onsessionApi();
    await RedApi.prizeOutApiSuccess();
})

When(/^User launches the prizeout Fail$/, async() => {
    await RedApi.prizeOutApiFail();
})

