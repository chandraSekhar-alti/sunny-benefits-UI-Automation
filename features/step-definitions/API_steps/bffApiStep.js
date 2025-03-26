const { Given, When, Then } = require("@wdio/cucumber-framework");
const BffApi = require("../../pageobjects/api/bffApi");
const utilTools = require("../../../utils/tools");
const parallel = require("../../pageobjects/api/parallelTest");
let bffApiData = require("../../../data/bffApiData.json");
const bffApiURL = require("../../../data/bffApiURL.json");
require("dotenv").config();


When(/^User captures JWT token by sending a post request to consumer-login api$/, async() => {
    await BffApi.consumerLogin();
})

When(/^User captures taskID from consumer summary API$/, async() => {
    await BffApi.consumerSummary();
})

Then(/^Consumer enrolls a tasks using the enroll API$/, async() => {
    await BffApi.walletAPI();
    await BffApi.taskEnroll_1();
    // await BffApi.taskEnroll_2();
})

Then(/^Consumer enrolls two tasks using the enroll API$/, async() => {
    await BffApi.walletAPI();
    await BffApi.taskEnroll_1();
    await BffApi.taskEnroll_2();
})

Then(/^Consumer completes a task using task update API$/, async() => {
    await BffApi.updateTask();
    await BffApi.getAllConsumerTask();
    await BffApi.walletAPI();
})

Then(/^Hitting enroll API parallely to verify the response$/, async() => {
    await parallel.runConcurrentRequests();  
})

Then(/^Hitting update API parallely to verify the response$/, async() => {
    await parallel.parallelRequestForUpdateApi();  
    await BffApi.getAllConsumerTask();
    await BffApi.walletAPI();
})

Then(/^validating performance of consumer summary api$/, async() => {
    bffApiURL.consumer_summary_api_url = process.env.BFF_API_base_URL + "v1/bff/consumer-summary";
    await BffApi.perfomanceTestOnApi_postReq(bffApiURL.consumer_summary_api_url, bffApiData.consumer_summeryApi.currentPayload, "Consumer summary API");
})

Then(/^validating performance of get tenant code by consumer api$/, async() => {
    bffApiURL.get_tenant_by_consumer_code_url = process.env.BFF_API_base_URL + "Tenant/get-tenant-by-consumer-code";
    await BffApi.perfomanceTestOnApi_postReq(bffApiURL.get_tenant_by_consumer_code_url, bffApiData.get_tenant_by_consumer_code.currentPayload, "Get Tenant by Consumer Code API");
})

Then(/^validating performance of get consumer subtask api$/, async() => {
    bffApiURL.get_consumer_sub_task_url = process.env.BFF_API_base_URL + "v1/bff/get-consumer-subtasks";
    await BffApi.perfomanceTestOnApi_postReq(bffApiURL.get_consumer_sub_task_url, bffApiData.get_tenant_by_consumer_code.currentPayload, "Get Consumer Sub Task API");
})

Then(/^validating performance of component list api$/, async() => {
    bffApiURL.get_component_list_url = process.env.BFF_API_base_URL + "v1/component-list";
    await BffApi.perfomanceTestOnApi_postReq(bffApiURL.get_component_list_url, bffApiData.get_component_list.currentPayload, "Component List API");
})

Then(/^validating performance of trivia tasks api$/, async() => {
    bffApiURL.get_available_trivia_tasks_url = process.env.BFF_API_base_URL + "v1/available-trivia-task?consumerCode="+bffApiData.consumer_summeryApi.currentPayload.consumerCode;
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$: " + bffApiURL.get_available_trivia_tasks_url);
    await BffApi.perfomanceTestOnApi_getReq(bffApiURL.get_available_trivia_tasks_url, "Trivia Tasks API");
})

Then(/^validating performance of consumer summary api with multiple users at a time$/, async() => {
    bffApiURL.consumer_summary_api_url = process.env.BFF_API_base_URL + "v1/bff/consumer-summary";
    await parallel.postReqForMultipleThreads(bffApiURL.consumer_summary_api_url, bffApiData.consumer_summeryApi.currentPayload, 50);
})

Then(/^validating performance of get tenant code by consumer api with multiple users at a time$/, async() => {
    bffApiURL.get_tenant_by_consumer_code_url = process.env.BFF_API_base_URL + "Tenant/get-tenant-by-consumer-code";
    await parallel.postReqForMultipleThreads(bffApiURL.get_tenant_by_consumer_code_url, bffApiData.get_tenant_by_consumer_code.currentPayload, 50);
})

Then(/^validating performance of get consumer subtask api with multiple users at a time$/, async() => {
    bffApiURL.get_consumer_sub_task_url = process.env.BFF_API_base_URL + "v1/bff/get-consumer-subtasks";
    await parallel.postReqForMultipleThreads(bffApiURL.get_consumer_sub_task_url, bffApiData.get_tenant_by_consumer_code.currentPayload, 50);
})

Then(/^validating performance of component list api with multiple users at a time$/, async() => {
    bffApiURL.get_component_list_url = process.env.BFF_API_base_URL + "v1/component-list";
    await parallel.postReqForMultipleThreads(bffApiURL.get_component_list_url, bffApiData.get_component_list.currentPayload, 50);
})

