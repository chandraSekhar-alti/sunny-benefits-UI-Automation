const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const { assert} = require("chai");
const utilTools = require("../../../utils/tools");
const consumerDetailsData = require("../../../data/consumerDetails.json");
const redemptionApiData = require("../../../data/redemptionApiData.json");
const redemptionApiURL = require("../../../data/redemptionApiURL.json");
// const redemptionApiData = utilTools.readJson(`${process.cwd()}\\data\\redemptionApiData.json`);
// const redemptionApiURL = utilTools.readJson(`${process.cwd()}\\data\\redemptionApiURL.json`);
var genChars = "abcdefghijklmnopqrstuvwxyz";
var genNum = "0123456789";
var genVar = "abcdefghijklmnopqrstuvwxyz123456789"


class Redemption{

async balanceApi(){
    redemptionApiData.balanceApi.currentPayload.partner_session_id = consumerDetailsData.consumerCode;
    redemptionApiURL.balance_api_url = process.env.redemption_API_base_url + "balance";
    redemptionApiData.balanceApi.currentPayload.request_id = utilTools.generateRandString(5,genVar) + "hd-89f9-4a7b-bfca-a0679114vfu";
    fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiData.json`, JSON.stringify(redemptionApiData));
    fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiURL.json`,JSON.stringify(redemptionApiURL));
    const response = await axios.post( redemptionApiURL.balance_api_url, redemptionApiData.balanceApi.currentPayload);
    this.response = response;
    console.log("Balance Api Response Status : "+response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    console.log("Balance Api Response : "+JSON.stringify(response.data));
}

async onsessionApi(){
  redemptionApiData.onsession.currentPayload.partner_session_id = consumerDetailsData.consumerCode;
  redemptionApiURL.on_session_api_url = process.env.redemption_API_base_url + "on-session";
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiData.json`, JSON.stringify(redemptionApiData));
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiURL.json`, JSON.stringify(redemptionApiURL));
  const response = await axios.post( redemptionApiURL.on_session_api_url, redemptionApiData.onsession.currentPayload);
  this.response = response;
  console.log("Onsession Api Response Status : "+response.status);
  assert.equal(response.status, "200", "successfully validated response code");
  console.log("Onsession Response : "+JSON.stringify(response.data));
}

async prizeOutApiSuccess(){
  redemptionApiURL.success_Api_base_Url = process.env.redemption_API_base_url + "success";
  redemptionApiData.successApi.currentPayload.request_id = redemptionApiData.balanceApi.currentPayload.request_id;
  redemptionApiData.successApi.currentPayload.giftcard_cost = redemptionApiData.balanceApi.currentPayload.giftcard_cost;
  redemptionApiData.successApi.currentPayload.giftcard_value = redemptionApiData.balanceApi.currentPayload.giftcard_value;
  redemptionApiData.successApi.currentPayload.partner_session_id = consumerDetailsData.consumerCode;
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiURL.json`,JSON.stringify(redemptionApiURL));
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiData.json`,JSON.stringify(redemptionApiData));
  const response = await axios.post(redemptionApiURL.success_Api_base_Url, redemptionApiData.successApi.currentPayload);
  this.response = response;
  console.log("Prizeout success Api Response Status : "+response.status);
  assert.equal(response.status, "200", "successfully validated response code");
  console.log("Prizeout success Response : "+JSON.stringify(response.data));
}
async prizeOutApiFail(){
  redemptionApiURL.fail_Api_base_Url = process.env.redemption_API_base_url + "fail";
  redemptionApiData.failApi.currentPayload.request_id = redemptionApiData.balanceApi.currentPayload.request_id;
  redemptionApiData.failApi.currentPayload.giftcard_cost = redemptionApiData.successApi.currentPayload.giftcard_cost;
  redemptionApiData.failApi.currentPayload.giftcard_value = redemptionApiData.successApi.currentPayload.giftcard_value;
  redemptionApiData.failApi.currentPayload.partner_session_id = redemptionApiData.successApi.currentPayload.partner_session_id;
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiURL.json`,JSON.stringify(redemptionApiURL));
  fs.writeFileSync(`${process.cwd()}\\data\\redemptionApiData.json`,JSON.stringify(redemptionApiData));
  const response = await axios.post(redemptionApiURL.fail_Api_base_Url, redemptionApiData.failApi.currentPayload);
  this.response = response;
  console.log("Prizeout Fail Api Response Status : "+response.status);
  assert.equal(response.status, "200", "successfully validated response code");
  console.log("Prizeout Fail Response : "+JSON.stringify(response.data));
}

}

module.exports = new Redemption();