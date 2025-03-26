const { When, Then } = require("@wdio/cucumber-framework");
const connections = require("../../pageobjects/api/connectingCmdPromt");
const CreateConsumer = require("../../pageobjects/api/createConsumer");
const datafeedApiUrls = require("../../../data/dataFeedApiUrls.json");
var datafeedApiData = require("../../../data/dataFeedApi.json");;
require("dotenv").config();
const fs = require("fs");
let newConsumerArray = [];

When(/^User creates 30 consumer using the data-feed-member API$/, async () => {
    datafeedApiUrls.members_api_url_dev = process.env.Data_Feed_Api_Base_Url_Dev + "v1/data-feed/members";
    fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`, JSON.stringify(await datafeedApiUrls));
    let ApiKey = datafeedApiData.x_api_key_dev;
    newConsumerArray = await CreateConsumer.create30Consumers(datafeedApiUrls.members_api_url_dev, ApiKey);
    console.log("&&&&&&&&&&& newConsumerArray &&&&&&&&&&&& :  " + newConsumerArray);
})

Then(/^User opens command promt and execute command to verify consumers$/, async () => {
    const command = `"${process.cwd()}/net8.0/SunnyRewards.Helios.ETL.App.exe" --tenantCode ten-ecada21e57154928a2bb959e8365b8b4 --startIndex 0 --maxEnrollments 0 --fisCreateCards --localDownloadFolderPath "${process.cwd()}/net8.0/tmp"`;
    const directory = `${process.cwd()}/net8.0`;
    await connections.runCommand(command, directory);
})

Then(/^User validate newly created consumers from etl file$/, async () => {
    await connections.validationOfConsumers(newConsumerArray);
})

When(/^User deletes all the etl files present in the etl folder$/, async () => {
    await connections.deletingFiles();
})