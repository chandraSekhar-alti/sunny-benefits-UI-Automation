const { Client } = require('pg');
// const tunnel = require('tunnel-ssh');
const utilConst = require("../../../utils/const");
let bffApiData = require("../../../data/bffApiData.json");
let redemptionData = require("../../../data/redemptionApiData.json");
let consumerDetailsData = require("../../../data/consumerDetails.json");
let DBQueryResultsData = require("../../../data/dbQueryResultsData.json");
const { assert } = require("chai");
const fs = require("fs");


class DatabaseConnection {
  async dbConnect_consumerTaskTable() {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    // Initialize PostgreSQL client
    const pgClient = new Client(pgConfig);
    // Connect to PostgreSQL
    await pgClient.connect();
    const consumer_task_res = await pgClient.query(`Select * from task.consumer_task WHERE consumer_code = '${bffApiData.consumer_summeryApi.currentPayload.consumerCode}' and task_id=4`);
    console.log("Consumer_Task db Rows : ", consumer_task_res);
    console.log("#########################################################", consumer_task_res.rows);
    // for (let row of consumer_task_res.rows) {
    // // Iterate over each column in the row
    // for (let columnName in row) {
    // // Access the value of each column in the row
    // let columnValue = row[columnName];
    //    if (`${columnName}` == 'wallet_id') {
    //       console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletId);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.walletId);
    //    } else if (`${columnName}` == 'customer_code') {
    //       console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.customerCode);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.customerCode, "successfully verified customer code from wallet Api with customer code from wallet table");
    //    } else if (`${columnName}` == 'tenant_code') {
    //       console.log(`${columnName}:  ${columnValue}`, 
    //       .wallet.tenantCode);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.tenantCode, "successfully verified tenant code from wallet Api with tenant code from wallet table");
    //    } else if (`${columnName}` == 'wallet_code') {
    //       console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletCode);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.walletCode, "successfully verified wallet code from wallet Api with wallet code from wallet table");
    //    } else if (`${columnName}` == 'balance') {
    //       const bal = Number.parseFloat(` ${columnValue}`, 10);
    //       console.log(`${columnName}: `, bal, benifitsApiData.wallet.balance);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.balance, "successfully verified balance from wallet Api with balance from wallet table");
    //    } else if (`${columnName}` == 'earn_maximum') {
    //       const earnMax = Number.parseFloat(` ${columnValue}`, 10);
    //       console.log(`${columnName}: `, earnMax, benifitsApiData.wallet.earnMaximum);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.earnMaximum, "successfully verified max earned from wallet Api with max earned from wallet table");
    //    } else if (`${columnName}` == 'total_earned') {
    //       const totalEarn = Number.parseFloat(` ${columnValue}`, 10);
    //       console.log(`${columnName}: `, totalEarn, benifitsApiData.wallet.totalEarned);
    //       assert.equal(`${columnValue}`, benifitsApiData.wallet.totalEarned, "successfully verified total earned from wallet Api with total earned from wallet table");
    //    }
    //   }
    // }     
  }

  async connectToPostgres() {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    // Initialize PostgreSQL client
    const pgClient = new Client(pgConfig);
    // Connect to PostgreSQL
    await pgClient.connect();
    const consumer_wallet_res = await pgClient.query(`SELECT * FROM wallet.consumer_wallet WHERE consumer_code = '${bffApiData.consumer_summeryApi.currentPayload.consumerCode}' and delete_nbr=0`);
    console.log("Consumer_Wallet db Rows : ", consumer_wallet_res);
    console.log("$$$$$$$$$$$$$$$$$$$: ", consumer_wallet_res.rows[0].wallet_id);
    const wallet_ID1 = consumer_wallet_res.rows[0].wallet_id;
    const wallet_trans_res = await pgClient.query(`SELECT * FROM wallet.transaction WHERE wallet_id = '${wallet_ID1}' and delete_nbr=0`);
    console.log("previous_balance", wallet_trans_res.rows[1].previous_balance);
    console.log("transaction_amount", wallet_trans_res.rows[1].transaction_amount);
    console.log("balance", wallet_trans_res.rows[1].balance);
    let previousBal = wallet_trans_res.rows[1].previous_balance;
    previousBal = previousBal.substring(0, 2);
    let transactionAmt = wallet_trans_res.rows[1].transaction_amount;
    transactionAmt = transactionAmt.substring(0, 2);
    let bal = wallet_trans_res.rows[1].balance;
    bal = bal.substring(0, 2);
    assert.equal(previousBal, bffApiData.get_all_consumer_transactions_Api.currentBalance);
    let redemptionAmt = redemptionData.balanceApi.currentPayload.giftcard_cost;
    let redemption_Amt = redemptionAmt.toString();
    redemption_Amt = redemption_Amt.substring(0, 2);
    assert.equal(transactionAmt, redemption_Amt);
    let balAmt = parseInt(bal, 10);
    console.log("^^^^^^^^^^^^^^^^^^: ", bal);
    assert.equal(bal, balAmt);
  }

  async dbConnectRedemption_Fail() {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    // Initialize PostgreSQL client
    const pgClient = new Client(pgConfig);
    // Connect to PostgreSQL
    await pgClient.connect();
    const consumer_wallet_res = await pgClient.query(`SELECT * FROM wallet.consumer_wallet WHERE consumer_code = '${bffApiData.consumer_summeryApi.currentPayload.consumerCode}' and delete_nbr=0`);
    console.log("Consumer_Wallet db Rows : ", consumer_wallet_res);
    console.log("@@@@@@@@@@@@@@@: ", consumer_wallet_res.rows[0].wallet_id);
    const wallet_ID1 = consumer_wallet_res.rows[0].wallet_id;
    const wallet_trans_res = await pgClient.query(`SELECT * FROM wallet.transaction WHERE wallet_id = '${wallet_ID1}' and delete_nbr=0`);
    console.log("previous_balance", wallet_trans_res.rows[2].previous_balance);
    console.log("transaction_amount", wallet_trans_res.rows[2].transaction_amount);
    console.log("balance", wallet_trans_res.rows[2].balance);
    let previousBal = wallet_trans_res.rows[1].previous_balance;
    previousBal = previousBal.substring(0, 2);
    let transactionAmt = wallet_trans_res.rows[1].transaction_amount;
    transactionAmt = transactionAmt.substring(0, 2);
    let bal = wallet_trans_res.rows[1].balance;
    bal = bal.substring(0, 2);
    assert.equal(previousBal, bffApiData.get_all_consumer_transactions_Api.currentBalance);
    let redemptionAmt = redemptionData.balanceApi.currentPayload.giftcard_cost;
    let redemption_Amt = redemptionAmt.toString();
    redemption_Amt = redemption_Amt.substring(0, 2);
    assert.equal(transactionAmt, redemption_Amt);
    let balAmt = parseInt(bal, 10);
    assert.equal(bal, balAmt);

  }


  async fisTenantAccountTable() {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port_qa}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    const client = new Client(pgConfig);
    await client.connect();
    const fis_tenant_res = await client.query(`SELECT * FROM fis.tenant_account WHERE tenant_code = '${consumerDetailsData.tenantCode}'`);
    console.log("fis_table_tenant_config_json: ", JSON.stringify(fis_tenant_res.rows[0].tenant_config_json));
    DBQueryResultsData.tenant_config_json = fis_tenant_res.rows[0].tenant_config_json;
    fs.writeFileSync(`${process.cwd()}\\data\\dbQueryResultsData.json`, JSON.stringify(DBQueryResultsData));
  }
  async validatingBenefitWallets(walletType, walletName) {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port_qa}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    const client = new Client(pgConfig);
    await client.connect();
    const benefits_wallet_type_0_res = await client.query(
      `select cw.consumer_code, w.wallet_id, w.wallet_name, wt.wallet_type_name, wt.wallet_type_code, w.tenant_code from wallet.consumer_wallet cw  join
        wallet.wallet w on cw.wallet_id = w.wallet_id and cw.tenant_code = w.tenant_code
        join wallet.wallet_type wt on w.wallet_type_id = wt.wallet_type_id
        where cw.consumer_code = '${consumerDetailsData.consumerCode}'
        and cw.tenant_code = '${consumerDetailsData.tenantCode}' 
        and cw.delete_nbr = 0
        and w.delete_nbr = 0
        and w.master_wallet = false
        and wt.wallet_type_code = '${walletType}'`);
    console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res.rows[0].wallet_name);
    console.log("wallet_name : " + walletName);
    if (walletName == "REW") {
      console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res.rows[0].wallet_name);
      // console.log("wallet_name : " + "HEALTHY ACTIONS");
      // assert.equal("HEALTHY ACTIONS", benefits_wallet_type_0_res.rows[0].wallet_name);
    } else {
      console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res.rows[0].wallet_name);
      console.log("wallet_name : " + walletName);
      assert.equal(walletName, benefits_wallet_type_0_res.rows[0].wallet_name);
    }
  }

  async validatingBenefitMasterWallets(walletType) {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port_qa}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    const client = new Client(pgConfig);
    await client.connect();
    const benefits_wallet_type_0_res = await client.query(
      `select w.wallet_id, w.wallet_name, wt.wallet_type_name, wt.wallet_type_code, w.tenant_code
        from wallet.wallet w
        join wallet.wallet_type wt on w.wallet_type_id = wt.wallet_type_id
        and w.tenant_code = '${consumerDetailsData.tenantCode}' 
        and w.delete_nbr = 0
        and w.master_wallet = true
        and wt.wallet_type_code = '${walletType}'`);
    console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res);
  }

  async validatingRewardWallets(walletType,walletName) {
    const pgConfig = {
      user: `${utilConst.Const.username}`,
      host: `${utilConst.Const.host_qa}`,
      database: `${utilConst.Const.dbName}`,
      password: `${utilConst.Const.psd}`,
      port: `${utilConst.Const.port_qa}`,
      sslmode: "disable",
      ssl: { rejectUnauthorized: false }
    };
    const client = new Client(pgConfig);
    await client.connect();
    const benefits_wallet_type_0_res = await client.query(
      `select cw.consumer_code, w.wallet_id, w.wallet_name, wt.wallet_type_name, wt.wallet_type_code, w.tenant_code from wallet.consumer_wallet cw  join
        wallet.wallet w on cw.wallet_id = w.wallet_id and cw.tenant_code = w.tenant_code
        join wallet.wallet_type wt on w.wallet_type_id = wt.wallet_type_id
        where cw.consumer_code = '${consumerDetailsData.consumerCode}'
        and cw.tenant_code = '${consumerDetailsData.tenantCode}' 
        and cw.delete_nbr = 0
        and w.delete_nbr = 0
        and w.master_wallet = false
        and wt.wallet_type_code = '${walletType}'`);
    console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res);
    console.log("fis_table_tenant_config_json: ", benefits_wallet_type_0_res.rows[0].wallet_name);
      console.log("wallet_name : " + walletName);
      assert.equal(walletName, benefits_wallet_type_0_res.rows[0].wallet_name);
    
  }

}

module.exports = new DatabaseConnection();