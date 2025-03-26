const { When, Then } = require("@wdio/cucumber-framework");
const BenefitsBffApi = require("../../pageobjects/api/benefitsApi");
const BenefitsApiURL = require("../../../data/benefitsApiUrl.json");
const parallel = require("../../pageobjects/api/parallelTest");
let BenefitsApiData = require("../../../data/benefitsApiData.json");
require("dotenv").config();
const fs = require("fs");
let findStoreRes;


Then(/^validating performance of get consumer by email api$/, async() => {
    const email = BenefitsApiData.getConsumerByEmailApi.payload.email; 
    BenefitsApiURL.get_consumers_by_email = process.env.Benefits_API_Base_Url + `get-consumers-by-email?email=${encodeURIComponent(email)}`; 
    await BenefitsBffApi.perfomanceTestOnApi_getReqForBenefitsBff(BenefitsApiURL.get_consumers_by_email, "Get Consumer By Email API");
})

Then(/^validating performance of get tenant by consumer code api$/, async() => {
    let consumerCode = BenefitsApiData.consumercode;
    BenefitsApiURL.get_tenant_by_consumer_code_url = process.env.Benefits_API_Base_Url +`get-tenant-by-consumer-code?consumerCode=${encodeURIComponent(consumerCode)}`;
    await BenefitsBffApi.perfomanceTestOnApi_getReqForBenefitsBff(BenefitsApiURL.get_tenant_by_consumer_code_url, "Get Tenant By Consumer Code API");
})

Then(/^validating performance of wallet api$/, async() => {
    BenefitsApiURL.walletAPiUrl = process.env.Benefits_API_Base_Url +`wallets`;
    await BenefitsBffApi.perfomanceTestOnApi_postReqForBenefitsBff(BenefitsApiURL.walletAPiUrl,BenefitsApiData.walletApi.currentPayload, "Wallet API");
})

Then(/^validating performance of transactions api$/, async() => {
    BenefitsApiURL.transactionsApiUrl = process.env.Benefits_API_Base_Url +`transactions`;
    await BenefitsBffApi.perfomanceTestOnApi_postReqForBenefitsBff(BenefitsApiURL.transactionsApiUrl,BenefitsApiData.transactionApi.currentPayload, "Transactions API");
})

When(/^User finds a store by hitting find-store api$/, async() => {
    findStoreRes = await BenefitsBffApi.findStoreApi();
})

Then(/^User validate the find-store api response$/, async() => {
    console.log("Find Store search results :" + findStoreRes);
})

Then(/^validating performance of get consumer by email api with multiple users at a time$/, async() => {
    const email = BenefitsApiData.getConsumerByEmailApi.payload.email; 
    BenefitsApiURL.get_consumers_by_email = process.env.Benefits_API_Base_Url + `get-consumers-by-email?email=${encodeURIComponent(email)}`; 
    await BenefitsBffApi.BenefitsBffGetReqForMultipleThreads(BenefitsApiURL.get_consumers_by_email, 50);
})

Then(/^validating performance of get tenant by consumer code api with multiple users at a time$/, async() => {
    let consumerCode = BenefitsApiData.consumercode;
    BenefitsApiURL.get_tenant_by_consumer_code_url = process.env.Benefits_API_Base_Url +`get-tenant-by-consumer-code?consumerCode=${encodeURIComponent(consumerCode)}`;
    await BenefitsBffApi.BenefitsBffGetReqForMultipleThreads(BenefitsApiURL.get_tenant_by_consumer_code_url, 50);
})

Then(/^validating performance of wallet api with multiple users at a time$/, async() => {
    BenefitsApiURL.walletAPiUrl = process.env.Benefits_API_Base_Url +`wallets`;
    await BenefitsBffApi.BenefitsBffPostReqForMultipleThreads(BenefitsApiURL.walletAPiUrl,BenefitsApiData.walletApi.currentPayload, 50);
})