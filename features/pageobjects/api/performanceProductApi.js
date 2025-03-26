const axios = require("axios");
let retailApiData = require('../../../data/retailApiData.json');
let retailApiUrl = require('../../../data/retailApiUrl.json');
let dataFeedApiData = require('../../../data/dataFeedApi.json');
const { assert} = require("chai");
const fs = require("fs");
const { addFeature, addStep } = require('cucumber-html-reporter');


class ProductsPage {

    async postRequestCall(url, requestBody, header) {
        try {
            const response = await axios.post(url, requestBody, header);
            return {
                status: response.status,
                data: response.data
            };
        } catch (error) {
            if (error.response) {
                return {
                    status: error.response.status,
                    data: error.response.data
                };
            } else {
                throw error;
            }
        }
    }

    async runProductsApiRequest(threadCount) {
        let successCount = 0;
        let statusCode_401 = 0;
        let statusCode_504 = 0;
        let failedCount = 0;
        try {
            retailApiUrl.product_api_url = process.env.Retail_API_base_URL + "v1/products";
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : " +retailApiUrl.product_api_url);
            console.log("Payload : " + JSON.stringify(retailApiData.productsApiPayload));
            
            // Define an array to store promises for each request
            const requests = [];

            for (let i = 0; i < threadCount; i++) {
                requests.push(this.postRequestCall(retailApiUrl.product_api_url, JSON.stringify(retailApiData.productsApiPayload),
                    {
                        headers: {
                            "X-API-Key": dataFeedApiData.x_api_key,
                            "Content-Type": "application/json",                            
                        },
                    }
                ));
            }
            // Invoke requests concurrently using Promise.all()
            const responses = await Promise.all(requests);

            // Process responses
            responses.forEach((response, index) => {
                console.log(`Response ${index + 1}:`);
                console.log(`Status code: ${response.status}`);
                if(response.status==200){
                successCount = successCount+1;
                }else if(response.status==401){
                    statusCode_401 = statusCode_401+1;
                }else if(response.status==504){
                    statusCode_504 = statusCode_504+1
                }else{
                    failedCount = failedCount+1;
                }              
            });
        console.log("----------------successCount------------ : " + successCount);
        console.log("----------------statusCode_401---------- : " + statusCode_401);
        console.log("----------------statusCode_504---------- : " + statusCode_504);
        console.log("----------------failedCount------------- : " + failedCount);
        return successCount;

        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }


    async productsApi(){
        const url = "https://retail-api.qa.sunnyrewards.com/api/v1/products";
        retailApiUrl.product_api_url = process.env.BFF_API_base_URL + "v1/products"; 
        console.log("Payload : " + JSON.stringify(retailApiData.productsApiPayload))
        const response = await axios.post(await url, retailApiData.productsApiPayload,
          {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY":"LyF37jGmvpoInV4zAKtLv9Ap1kllUw3NwSJLs7J77NQfs+2h8pYyRwvyN/bxFd8LrufSoJRRO8XZRQ/rn+rPwMNnJm/fOdvMYOLQaCNDV8b9M3o/nZr2vga7Tp3EAaLW",
              },
          }
        );
        this.response = await response;
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.status);
        // assert.equal(200, this.retailResp.status);
        // fs.writeFileSync(`${process.cwd()}\\data\\dataFeedApi.json`, JSON.stringify(datafeedApiData)); 
      }


}

module.exports = new ProductsPage();
