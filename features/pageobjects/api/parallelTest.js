const axios = require('axios');
const fs = require("fs");
const bffApiURL = require("../../../data/bffApiURL.json");
let bffApiData = require("../../../data/bffApiData.json");
let consumerDetailsData = require("../../../data/consumerDetails.json");
let summaryDataJson = require("../../../data/summaryJson.json");


class parallelTest {
    async makeRequest(url, requestBody, header) {
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : " + JSON.stringify(header));
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

    async runConcurrentRequests() {
        try {
            bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
            const numRequests = 4;

            // Define an array to store promises for each request
            const requests = [];

            for (let i = 0; i < numRequests; i++) {
                // requests.push(makeRequest(endpoint));
                requests.push(this.makeRequest(bffApiURL.enroll_api_url, bffApiData.enrollApi.enrollFirstTask,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${bffApiData.authToken}`,
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
            });
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async parallelRequestForUpdateApi() {
        try {
            bffApiURL.task_update_api_url = process.env.BFF_API_base_URL + "v1/bff/task-update";
            fs.writeFileSync(`${process.cwd()}\\data\\bffApiURL.json`, JSON.stringify(bffApiURL));
            const numRequests = 4;

            // Define an array to store promises for each request
            const requests = [];
            for (let i = 0; i < numRequests; i++) {
                requests.push(this.makeRequest(bffApiURL.task_update_api_url, bffApiData.task_update_Api.currentPayload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${bffApiData.authToken}`,
                        },
                    }
                ));
            }

            // Invoke requests concurrently using Promise.all()
            const responses = await Promise.all(requests);


            // Process responses
            responses.forEach((response, index) => {
                console.log(`Response ${index + 1}:`);
                console.log(`Update task API Response Status :  ${response.status}`);
            });
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
    async postReqForMultipleThreads(url, payload, threadCount) {

        try {
            const requests = [];
            for (let i = 0; i < threadCount; i++) {
                requests.push(this.makeRequest(url, payload,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${bffApiData.authToken}`,
                        },
                    }
                ));
            }
            var startTime = new Date().getTime();
            // Invoke requests concurrently using Promise.all()
            const responses = await Promise.all(requests);

            // Process responses
            responses.forEach((response, index) => {
                console.log(`Response ${index + 1}:`);
                console.log(`Update task API Response Status :  ${response.status}`);
            });
            var endTime = new Date().getTime();
            const diff = Math.abs(endTime - startTime);
            console.log(" ---------------- Response Time (mSec) ---------------- : " + diff);


        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }



}
module.exports = new parallelTest();
