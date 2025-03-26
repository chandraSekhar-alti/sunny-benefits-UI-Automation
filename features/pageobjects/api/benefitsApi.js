
const { assert } = require("chai");
const axios = require("axios");
const fs = require("fs");
const benefitsApiData = require("../../../data/benefitsApiData.json");
const benefitsApiURL = require("../../../data/benefitsApiUrl.json");
let bffApiData = require("../../../data/bffApiData.json");

class BenefitsBffAPI {
  async getConsumerByEmailApi() {
    const email = "maxinesenger@yopmail.com";
    benefitsApiURL.get_consumers_by_email = process.env.Benefits_API_Base_Url + `get-consumers-by-email?email=${encodeURIComponent(email)}`;
    fs.writeFileSync(
      `${process.cwd()}\\data\\benefitsApiUrl.json`,
      JSON.stringify(benefitsApiURL)
    );
    const response = await axios.get(
      benefitsApiURL.get_consumers_by_email,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${benefitsApiData.accessToken}`
        }
      }
    );
    this.response = response;
    console.log('Response code:', response.status);
    assert.equal(response.status, 200, "Successfully validated response code");

  }

  async getTenantByConsumerCodeApi() {
    let consumerCode = benifitsApiData.consumercode;
    benefitsApiURL.get_tenant_by_consumer_code_url = process.env.Benefits_API_Base_Url + `get-tenant-by-consumer-code?consumerCode=${encodeURIComponent(consumerCode)}`;
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiUrl.json`,
      JSON.stringify(benifitsApiURL)
    );
    const response = await axios.get(
      benefitsApiURL.get_tenant_by_consumer_code_url,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benefitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log('Response code:', response.status);
    assert.equal(response.status, "200", "successfully validated response code");
  }
  // user sends a post request to wallets api and asserts status code.
  async walletsApi() {
    benefitsApiURL.walletAPiUrl = process.env.Benefits_API_Base_Url + "wallets";
    fs.writeFileSync(
      `${process.cwd()}\\data\\benefitsApiUrl.json`,
      JSON.stringify(benefitsApiURL)
    );
    let consumerCode = benefitsApiData.consumercode;
    const response = await axios.post(benefitsApiURL.walletAPiUrl, benefitsApiData.walletApi.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benefitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log('Response code:', response.status);
    assert.equal(response.status, "200", "successfully validated response code");
  }
  async capturesWalletResponse() {
    let walletsResponse = this.response.data.walletDetailDto[0].wallet
    benifitsApiData.wallet.walletId = walletsResponse.walletId,
      benifitsApiData.wallet.walletTypeId = walletsResponse.walletTypeId,
      benifitsApiData.wallet.customerCode = walletsResponse.customerCode,
      benifitsApiData.wallet.tenantCode = walletsResponse.tenantCode,
      benifitsApiData.wallet.walletCode = walletsResponse.walletCode,
      benifitsApiData.wallet.balance = walletsResponse.balance,
      benifitsApiData.wallet.earnMaximum = walletsResponse.earnMaximum,
      benifitsApiData.wallet.totalEarned = walletsResponse.totalEarned,
      benifitsApiData.wallet.pendingTasksTotalRewardAmount = walletsResponse.pendingTasksTotalRewardAmount,
      benifitsApiData.wallet.leftToEarn = walletsResponse.leftToEarn
    fs.writeFileSync(`${process.cwd()}\\data\\benifitsApiData.json`, JSON.stringify(benifitsApiData));
  }
  async validatesWalletResponse() {
    const pgConfig = await connectToDb.dbCredentials();
    async function connectToPostgres() {
      // Initialize PostgreSQL client
      const pgClient = new Client(pgConfig);
      try {
        // Connect to PostgreSQL
        await pgClient.connect();
        pgClient.query(`select wallet_id, customer_code, tenant_code, wallet_code, balance, earn_maximum, total_earned from wallet.wallet where wallet_id= ${benifitsApiData.wallet.walletId}`, (err, res) => {

          if (!err) {
            console.log("#########################################################", res.rows);
            for (let row of res.rows) {
              // Iterate over each column in the row
              for (let columnName in row) {
                // Access the value of each column in the row
                let columnValue = row[columnName];
                if (`${columnName}` == 'wallet_id') {
                  console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletId);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.walletId);
                } else if (`${columnName}` == 'customer_code') {
                  console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.customerCode);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.customerCode, "successfully verified customer code from wallet Api with customer code from wallet table");
                } else if (`${columnName}` == 'tenant_code') {
                  console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.tenantCode);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.tenantCode, "successfully verified tenant code from wallet Api with tenant code from wallet table");
                } else if (`${columnName}` == 'wallet_code') {
                  console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletCode);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.walletCode, "successfully verified wallet code from wallet Api with wallet code from wallet table");
                } else if (`${columnName}` == 'balance') {
                  const bal = Number.parseFloat(` ${columnValue}`, 10);
                  console.log(`${columnName}: `, bal, benifitsApiData.wallet.balance);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.balance, "successfully verified balance from wallet Api with balance from wallet table");
                } else if (`${columnName}` == 'earn_maximum') {
                  const earnMax = Number.parseFloat(` ${columnValue}`, 10);
                  console.log(`${columnName}: `, earnMax, benifitsApiData.wallet.earnMaximum);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.earnMaximum, "successfully verified max earned from wallet Api with max earned from wallet table");
                } else if (`${columnName}` == 'total_earned') {
                  const totalEarn = Number.parseFloat(` ${columnValue}`, 10);
                  console.log(`${columnName}: `, totalEarn, benifitsApiData.wallet.totalEarned);
                  assert.equal(`${columnValue}`, benifitsApiData.wallet.totalEarned, "successfully verified total earned from wallet Api with total earned from wallet table");
                }
              }
            }
          } else {
            console.log(err.message);
          }
        })
      } catch (error) {
        console.error('Error:', error);
      }
    }
    // Run the function
    await connectToPostgres();
  }
  async transactionAPI() {
    benifitsApiURL.transactionsApiUrl = process.env.Benefits_API_Base_Url + "transactions";
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiUrl.json`,
      JSON.stringify(benifitsApiURL)
    );
    let consumerCode = benifitsApiData.consumercode;
    let walletId = benifitsApiData.wallet.walletId
    const response = await axios.post(
      benifitsApiURL.transactionsApiUrl,
      {
        consumerCode,
        walletId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benifitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log("transaction data", this.response.data.transaction)
  }
  async transactionDetails() {
    benifitsApiData.transactions.Today = this.response.data.transaction.Today
    benifitsApiData.transactions.ThisMonth = this.response.data.transaction['This Month'];
    benifitsApiData.transactions.previous = this.response.data.transaction['Previous Transactions'];
    for (let i = 0; i < this.response.data.transaction.Today.length; i++) {
      console.log("TransactionDetailIds:::", this.response.data.transaction.Today[i].transactionDetail.transactionDetailId),
        console.log("TaskRewardCode:::::", this.response.data.transaction.Today[i].transactionDetail.taskRewardCode)
    }
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiData.json`,
      JSON.stringify(benifitsApiData)
    );
  }

  async findStoreApi() {
    benefitsApiURL.find_store_url = process.env.Benefits_API_Base_Url + "find-store";
    fs.writeFileSync(`${process.cwd()}\\data\\benefitsApiUrl.json`, JSON.stringify(benefitsApiURL));

    const response = await axios.post(benefitsApiURL.find_store_url, benefitsApiData.findStoreApi.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benefitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", this.response.data);
    console.log('Response code:', response.status);
    assert.equal(response.status, "200", "successfully validated response code");
    return JSON.stringify(this.response.data);
  }

  async perfomanceTestOnApi_getReqForBenefitsBff(url, message) {
    var count = 0;
    let sum = 0;
    var myArray = new Array();
    for (let i = 1; i <= 50; i++) {
      var startTime = new Date().getTime();
      var response = await axios.get(url,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${benefitsApiData.accessToken}`
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

  async perfomanceTestOnApi_postReqForBenefitsBff(url, payload, message) {
    var count = 0;
    let sum = 0;
    var myArray = new Array();
    for (let i = 1; i <= 50; i++) {
      var startTime = new Date().getTime();
      const response = await axios.post(url, payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${benefitsApiData.accessToken}`
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

  async makeGetRequest(url, header) {
    try {
        const response = await axios.get(url, header);
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


  async BenefitsBffGetReqForMultipleThreads(url, threadCount) {

    try {
        const requests = [];
        for (let i = 0; i < threadCount; i++) {
            requests.push(this.makeGetRequest(url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${benefitsApiData.accessToken}`
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

async makePostRequest(url, payload, header) {
    try {
        const response = await axios.get(url, payload, header);
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


  async BenefitsBffPostReqForMultipleThreads(url, payload, threadCount) {

    try {
        const requests = [];
        for (let i = 0; i < threadCount; i++) {
            requests.push(this.makeGetRequest(url, payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${benefitsApiData.accessToken}`
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
module.exports = new BenefitsBffAPI();