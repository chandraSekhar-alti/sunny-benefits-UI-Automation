const { Given, When, Then } = require("@wdio/cucumber-framework");
const CreateConsumer = require("../../pageobjects/api/createConsumer");
const datafeedApiUrls = require("../../../data/dataFeedApiUrls.json");
var datafeedApiData = require("../../../data/dataFeedApi.json");;
require("dotenv").config();
const fs = require("fs");


When(/^User creates a new consumer using the data-feed-member API$/, async() => {
  datafeedApiUrls.members_api_url = process.env.Data_Feed_Api_Base_Url+"v1/data-feed/members";
  fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`,JSON.stringify(await datafeedApiUrls));
  let ApiKey = datafeedApiData.x_api_key;
  let ApiSessionKey = datafeedApiData.x_api_session_key;
  await CreateConsumer.createNewConsumer(datafeedApiUrls.members_api_url,ApiSessionKey,ApiKey,200);
})

  When(/^User captures X-API_SESSION-KEY from token API$/, async() => {
    datafeedApiUrls.token_api_url=process.env.Data_Feed_Api_Base_Url+"v1/token";
    fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`, JSON.stringify(datafeedApiUrls));
    let ApiKey = datafeedApiData.x_api_key;
    await CreateConsumer.tokenApi(datafeedApiUrls.token_api_url,ApiKey,200);
  })

  When(/^User captures X-API_SESSION-KEY from token API in Dev$/, async() => {
    datafeedApiUrls.token_api_url_dev=process.env.Data_Feed_Api_Base_Url_Dev+"v1/token";
    fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`, JSON.stringify(datafeedApiUrls));
    let ApiSessionKey = datafeedApiData.x_api_session_key_dev;
    let ApiKey = datafeedApiData.x_api_key_dev;
    await CreateConsumer.tokenApi( datafeedApiUrls.token_api_url_dev,ApiSessionKey,ApiKey,200);
  })

  When(/^validating response code for data feed tenant api with valid session key$/, async() => {
    let ApiSessionKey = datafeedApiData.x_api_session_key;
    await CreateConsumer.tenantApi(ApiSessionKey,200);
  })

  Then(/^validating response code of data feed api with junk session key$/, async() => {
    let ApiSessionKey = "eyJhbGciOiJIUzI1WsNsInR5cCI6IkpXVCJ9.eyJjdXN0b21lckNvZGUiOiJjdXMtMDRjMjExYjQzMzkzNDg1MDllYWE4NzBjZGVhNTk2MDAiLCJjdRT0b344ckxhYmVsIjoiVW5pdGVkIiwiZXhwIjoxNzE1ODUwMDE1fQ.mi4xRTixqbGwatIo3ZsD30UkMPGjUXqNVkGvDgjGXgg";
    await CreateConsumer.verifyDataFeedApiErrorResponseCode(ApiSessionKey, "Request failed with status code 401");
  })

  Then(/^validating response code of data feed api with empty session key$/, async() => {
    let ApiSessionKey = " ";
    await CreateConsumer.verifyDataFeedApiErrorResponseCode(ApiSessionKey, "Request failed with status code 401");
  })

  Then(/^validating response code of tenant api with junk session key$/, async() => {
    let ApiSessionKey = "eyJhbGciOiJIUzI1WsNsInR5cCI6IkpXVCJ9.eyJjdXN0b21lckNvZGUiOiJjdXMtMDRjMjExYjQzMzkzNDg1MDllYWE4NzBjZGVhNTk2MDAiLCJjdRT0b344ckxhYmVsIjoiVW5pdGVkIiwiZXhwIjoxNzE1ODUwMDE1fQ.mi4xRTixqbGwatIo3ZsD30UkMPGjUXqNVkGvDgjGXgg";
    await CreateConsumer.verifyTenantApiErrorResponseCode(ApiSessionKey, "Request failed with status code 401");
  })

  Then(/^validating response code of tenant api with empty session key$/, async() => {
    let ApiSessionKey = " ";
    await CreateConsumer.verifyTenantApiErrorResponseCode(ApiSessionKey, "Request failed with status code 401");
  })

  // When(/^User creates 30 consumer using the data-feed-member API$/, async() => {
  //   datafeedApiUrls.members_api_url_dev = process.env.Data_Feed_Api_Base_Url_Dev+"v1/data-feed/members";
  //   fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApiUrls.json`,JSON.stringify(await datafeedApiUrls));
  //   let ApiKey = datafeedApiData.x_api_key_dev;
  //   await CreateConsumer.create30Consumers(datafeedApiUrls.members_api_url_dev,ApiKey);
  // })