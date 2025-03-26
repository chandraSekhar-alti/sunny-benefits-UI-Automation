const { When, Then } = require('@wdio/cucumber-framework');
const productsPage = require('../../pageobjects/api/performanceProductApi');


let maxParallelCalls;
let successResponse ;

When(/^User invokes products API endpoint with multiple threads$/, async () => {
    maxParallelCalls = 50;
    successResponse = await productsPage.runProductsApiRequest(maxParallelCalls);
    // maxParallelCalls--; // Last successful count
});

Then(/^User determine the maximum parallel calls before failures occur$/, async () => {
    console.log(`Maximum parallel calls before failures occur: ${maxParallelCalls}`);
    console.log(`success response : ${successResponse}`);
});
