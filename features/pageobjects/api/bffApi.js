const axios = require("axios");
const fs = require("fs");
const { assert } = require("chai");
const utilTools = require("../../../utils/tools");
require("dotenv").config();
// import { multiremote } from 'webdriverio';

let bffApiData = require("../../../data/bffApiData.json");
const bffApiURL = require("../../../data/bffApiURL.json");
let consumerDetailsData = require("../../../data/consumerDetails.json");
let summaryDataJson = require("../../../data/summaryJson.json");

class BffApi {
  async consumerLogin() {
    bffApiData.background.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiData.json`, JSON.stringify(bffApiData));
    bffApiURL.consumer_login_api_url = process.env.BFF_API_base_URL + "v1/login/consumer-login";
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
    const response = await axios.post(bffApiURL.consumer_login_api_url, bffApiData.background.currentPayload);
    this.response = response;
    console.log("Jwt Token", this.response.data.jwt);
    bffApiData.authToken = this.response.data.jwt;
    bffApiData.consumer_summeryApi.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.get_all_consumer_tasks_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.enrollApi.enrollFirstTask.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.enrollApi.enrollSecondTask.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.task_update_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.get_all_consumer_tasks_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.get_all_consumer_transactions_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.get_tenant_by_consumer_code.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.refresh_token.currentPayload.consumerCode = consumerDetailsData.consumerCode;
    bffApiData.get_all_consumer_tasks_Api.currentPayload.tenantCode = consumerDetailsData.tenantCode;
    bffApiData.enrollApi.enrollFirstTask.tenantCode = consumerDetailsData.tenantCode;
    bffApiData.enrollApi.enrollSecondTask.tenantCode = consumerDetailsData.tenantCode;
    bffApiData.get_component_list.currentPayload.tenantCode = consumerDetailsData.tenantCode;
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiData.json`, JSON.stringify(bffApiData));
  }

  async consumerSummary() {
    bffApiURL.consumer_summary_api_url = process.env.BFF_API_base_URL + "v1/bff/consumer-summary";
    const response = await axios.post(bffApiURL.consumer_summary_api_url, bffApiData.consumer_summeryApi.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("Consumer Summary API Response status : " + response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    fs.writeFileSync(`${process.cwd()}\\data\\summaryJson.json`, JSON.stringify(response.data));
    // console.log("First task ID : "+JSON.stringify(summaryDataJson.availableTasks[2].task.taskId));
    console.log("Second task ID : " + JSON.stringify(summaryDataJson.availableTasks[1].task.taskId));
    // bffApiData.enrollApi.enrollFirstTask.taskId = JSON.stringify(summaryDataJson.availableTasks[0].task.taskId);
    bffApiData.enrollApi.enrollSecondTask.taskId = JSON.stringify(summaryDataJson.availableTasks[1].task.taskId);
    // bffApiData.enrollApi.firstPendingTaskName = JSON.stringify(summaryDataJson.availableTasks[0].task.taskName);
    bffApiData.enrollApi.secondPendingTaskName = JSON.stringify(summaryDataJson.availableTasks[1].task.taskName);
    // bffApiData.task_update_Api.currentPayload.taskId = JSON.stringify(summaryDataJson.availableTasks[0].task.taskId);
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiData.json`, JSON.stringify(bffApiData));
  }

  async taskEnroll_1() {
    bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
    const response = await axios.post(bffApiURL.enroll_api_url, bffApiData.enrollApi.enrollFirstTask,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("Enroll API Response Status : " + response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    console.log("Enroll API Response : " + JSON.stringify(response.data));
    console.log("Enroll API task status : " + JSON.stringify(response.data.consumerTask.taskStatus));
    let expectedVal = JSON.stringify(response.data.consumerTask.taskStatus);
    console.log("@@@@@@@@@@@@@@@@@@@@: " + expectedVal);
    expectedVal = expectedVal.replace(/['"]+/g, '');
    assert.equal(expectedVal, bffApiData.enrollApi.enrollFirstTask.taskStatus);
  }

  async taskEnroll_2() {
    bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
    var response_enrollApi = await axios.post(bffApiURL.enroll_api_url, bffApiData.enrollApi.enrollSecondTask,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response_enrollApi = response_enrollApi;
    console.log("Enroll API Response Status : " + response_enrollApi.status);
    assert.equal(response_enrollApi.status, "200", "successfully validated response code");
    console.log("Enroll API Response : " + JSON.stringify(response_enrollApi.data));
    console.log("Enroll API task Status : " + JSON.stringify(response_enrollApi.data.consumerTask.taskStatus));
    let expectedVal2 = JSON.stringify(response_enrollApi.data.consumerTask.taskStatus);
    expectedVal2 = expectedVal2.replace(/['"]+/g, '');
    assert.equal(expectedVal2, bffApiData.enrollApi.enrollSecondTask.taskStatus);
  }

  async updateTask() {
    bffApiURL.task_update_api_url = process.env.BFF_API_base_URL + "v1/bff/task-update";
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
    const response = await axios.post(bffApiURL.task_update_api_url, bffApiData.task_update_Api.currentPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("Update task API Response Status : " + response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    console.log("Update task API Response : " + JSON.stringify(response.data));
    console.log("consumerTaskId : " + JSON.stringify(response.data.consumerTask.consumerTaskId));
  }

  async getAllConsumerTask() {
    let taskUpdateData = require("../../../data/getAllConTask.json");
    bffApiURL.get_all_consumer_tasks_api_url = process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-tasks";
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
    const response = await axios.post(bffApiURL.get_all_consumer_tasks_api_url, bffApiData.get_all_consumer_tasks_Api.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("All consumer task API Response Status : " + response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    fs.writeFileSync(`${process.cwd()}\\data\\getAllConTask.json`, JSON.stringify(response.data));
    console.log("COMPLETED TASK Reward Amount ***********>", JSON.stringify(response.data.completedTasks[0].taskReward.reward));
    let completedTaskReward = JSON.stringify(response.data.completedTasks[0].taskReward.reward)
    completedTaskReward = completedTaskReward.replace(/[^\d-]/g, '');
    console.log("COMPLETED TASK Reward Amount ***********>" + completedTaskReward);
    bffApiData.task_update_Api.completedTaskAmount = completedTaskReward;
    fs.writeFileSync(`${process.cwd()}\\data\\bffApiData.json`, JSON.stringify(bffApiData));
  }

  async walletAPI() {
    bffApiURL.bff_wallets = process.env.BFF_API_base_URL + "v1/wallets";
    const response = await axios.post(bffApiURL.bff_wallets, bffApiData.get_tenant_by_consumer_code.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log("Update task API Response Status : " + response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    console.log("Update task API Response : " + JSON.stringify(response.data));
    console.log("************************************************************");
    console.log("ConsumerWalletBal : " + JSON.stringify(response.data.grandTotal));
    console.log("************************************************************");
  }

  async perfomanceTestOnApi_postReq(url, payload, message) {
    var count = 0;
    let sum = 0;
    var myArray = new Array();
    for (let i = 1; i <= 50; i++) {
      var startTime = new Date().getTime();
      const response = await axios.post(url, payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bffApiData.authToken}`,
          },
        }
      );
      this.response = response;
      assert.equal(response.status, "200", "successfully validated response code");
      var endTime = new Date().getTime();
      const diff = Math.abs(endTime - startTime);
      myArray.push(diff);
      if (diff > 1000) {
        count = count + 1;
      }
    }
    for (let j = 0; j < myArray.length; j++) {
      sum += myArray[j];
    }

    var min = Math.min.apply(Math, myArray);
    var avg = sum / myArray.length;
    let maxValue = myArray[0];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] > maxValue) {
        maxValue = myArray[i];
      }
    }
    console.log("----------------- MinValue -------------- : " + min);
    console.log("----------------- MaxValue -------------- : " + maxValue);
    console.log(" ---------------- Response Time (mSec) ---------------- : " + myArray);
    console.log(" ---------------- average ---------------- : " + avg);
    console.log(message + " ---------------- Count ---------------- : " + count);
  }

  async perfomanceTestOnApi_getReq(url, message) {
    var count = 0;
    let sum = 0;
    var myArray = new Array();
    for (let i = 1; i <= 10; i++) {
      var startTime = new Date().getTime();
      // console.log("---------------------->>> : " + i);        
      var response = await axios.get(url, {
        params: { tenantCode: "ten-ecada21e57154928a2bb959e8365b8b4" },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      });
      this.response = response;
      // console.log("API Response status : "+response.status);
      assert.equal(response.status, "200", "successfully validated response code");
      var endTime = new Date().getTime();
      const diff = Math.abs(endTime - startTime);
      const secondsDiff = Math.ceil(diff / 1000);
      myArray.push(diff);
      if (secondsDiff > 1) {
        count = count + 1;
        // console.log(message + " : Execution sequence number : " + i + " took " + secondsDiff + " seconds");
      }
    }
    for (let j = 0; j < myArray.length; j++) {
      sum += myArray[j];
    }

    var min = Math.min.apply(Math, myArray);
    var avg = sum / myArray.length;
    let maxValue = myArray[0];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] > maxValue) {
        maxValue = myArray[i];
      }
    }
    console.log("----------------- MinValue -------------- : " + min);
    console.log("----------------- MaxValue -------------- : " + maxValue);
    console.log(" ---------------- Response Time (mSec) ---------------- : " + myArray);
    console.log(" ---------------- average ---------------- : " + avg);
    console.log(message + " ---------------- Count ---------------- : " + count);
  }

}

module.exports = new BffApi();
