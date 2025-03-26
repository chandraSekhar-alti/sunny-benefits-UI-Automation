const { When, Then } = require("@wdio/cucumber-framework");
const database = require("../../pageobjects/api/databaseConnection");
const utilTools = require("../../../utils/tools");
require("dotenv").config();
const bffApiData = require("../../../data/bffApiData.json");
const { expect, assert, Assertion } = require("chai");
const utilConst = require("../../../utils/const");
let DBQueryResultsData = require("../../../data/dbQueryResultsData.json");
let DBData = require("../../../data/dbData.json");
const { Client } = require('pg');

Then(/^User validate consumer balance amount from wallet_transaction table$/, async () => {
    await database.connectToPostgres();
})

Then(/^User validate consumer balance amount from wallet_transaction table when prize out fail$/, async () => {
    await database.dbConnectRedemption_Fail();
})

Then(/^User verifies enroll task API response with the db data from cosumer_task table$/, async () => {
    await database.dbConnect_consumerTaskTable();
})

Then(/^User captures all the wallets available for the created consumer from fis tenant account table$/, async () => {
    await database.fisTenantAccountTable();
})

Then(/^User verifies consumer wallet in wallet tables$/, async () => {
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[0].walletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[0].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[0].purseWalletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[0].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[1].walletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[1].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[1].purseWalletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[1].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[2].walletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[2].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[2].purseWalletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[2].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[3].walletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[3].purseLabel);
    await database.validatingBenefitWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[3].purseWalletType,DBQueryResultsData.tenant_config_json.purseConfig.purses[3].purseLabel);
    
})

Then(/^User verifies master wallet entries in wallet_type table$/, async () => {
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[0].masterWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[0].masterRedemptionWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[1].masterWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[1].masterRedemptionWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[2].masterWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[2].masterRedemptionWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[3].masterWalletType);
    await database.validatingBenefitMasterWallets(DBQueryResultsData.tenant_config_json.purseConfig.purses[3].masterRedemptionWalletType);
})

Then(/^User verifies consumer wallet in wallet tables for rewards$/, async () => {
    await database.validatingRewardWallets(DBData.Rewards_Wallet_Code.Reward,"HEALTHY ACTIONS");
    await database.validatingRewardWallets(DBData.Rewards_Wallet_Code.Health_Actions_Sweepstakes_Entries, "SWEEPSTAKES_REWARD");
})

Then(/^User verifies consumer master wallet in wallet tables for rewards$/, async () => {
    await database.validatingBenefitMasterWallets(DBData.Master_Wallet_Code.Master_Reward);
    await database.validatingBenefitMasterWallets(DBData.Master_Wallet_Code.Master_Reward_Redemption);
    await database.validatingBenefitMasterWallets(DBData.Master_Wallet_Code.Master_Sweepstakes_Entries);
    await database.validatingBenefitMasterWallets(DBData.Master_Wallet_Code.Master_Sweepstakes_Entries_Redemption);
})



