const { Given, When, Then } = require("@wdio/cucumber-framework");
const argv = require('yargs').argv;
//const utilTools = require("../../../utils/tool");

const loginPage = require("../../pageobjects/ui/loginPage");
const consumerDetailsData = require('../../../data/consumerDetails.json')
const BffApi_Ui = require(`../../pageobjects/ui/bffApi_Ui`)
const allActionsPage = require(`../../pageobjects/ui/allActionsPage`)
const CreateConsumer = require("../../pageobjects/api/createConsumer");
var datafeedApiData = require("../../../data/dataFeedApi.json");
const { all } = require("axios");


require("dotenv").config();

When(/^User creates a consumer using datafeed API$/, async () => {
  let env = argv.Env;
  if(env=="QA"){
  let url_qa = process.env.Data_Feed_Api_Base_QaUrl+"v1/data-feed/members";
  let ApiKey = datafeedApiData.x_api_key;
  let ApiSessionKey = datafeedApiData.x_api_session_key;
  await CreateConsumer.createNewConsumer(url_qa,ApiSessionKey,ApiKey,200);
  }
  else if(env=="DEV") {
  let url_dev = process.env.Data_Feed_Api_Base_DevUrl+"v1/data-feed/members";
  let ApiKey = datafeedApiData.x_api_key_dev;
  let ApiSessionKey = datafeedApiData.x_api_session_key_dev;
  await CreateConsumer.createNewConsumer(url_dev,ApiSessionKey,ApiKey,200);
  }
  else if(env="INTEG"){
  let url_integ = process.env.Data_Feed_Api_Base_IntegUrl+"v1/data-feed/members";
  console.log("step1")
  let ApiKey = datafeedApiData.x_api_integ;
  console.log("step2")
  let ApiSessionKey = datafeedApiData.x_api_session_key_integ;
  console.log("step4")
  await CreateConsumer.createNewConsumer(url_integ,ApiSessionKey,ApiKey,200);
  console.log("step3")
  }

});


When(/^User is landing in Home page$/, async () => {
    await loginPage.open(consumerDetailsData.consumerCode);
    await loginPage.syncIssue();
  });

  Then(/^User closes trivia popup$/, async () => {
    await loginPage.triviaPopupClose();
  });
  Then(/^User captures Trivia task Id from getAllConsumerTasks$/, async () => {
    await loginPage.selectTriviaTask();
    await BffApi_Ui.getAllConsumerTask_UI();

  });

  Then(/^User captures trivia rewardid$/, async () => {
    await BffApi_Ui.taskRewardIdApi();

  });
  Then(/^Trivia questions is displayed for the user$/, async () => {
    await allActionsPage.triviaQuestions();
    //await allActionsPage.clickOnDone();
  });
  Then(/^User is enrolling tasks and validating the wallet balance$/, async () => {
   
    await allActionsPage.taskActions(3);
    await allActionsPage.balanceAmount();
    await allActionsPage.showMoreAction();
    await allActionsPage.selectPendingAction();
    await allActionsPage.updatedBalance();
   

  });
  Then(/^User is launching the consumer and validating the label when no penidng actions$/, async () => {
    await allActionsPage.showMoreAction();
    await allActionsPage.allPendingActions();
    

  });
  Then(/^User is enrolling more than 3 tasks and validating whether only 3 tasks are displaying under Pending Action section$/, async () => {
    await allActionsPage.taskActions(6);
    await allActionsPage.pendingActionslist()

  });
  Then(/^User is enrolling all the tasks and and completing any one of them will reach the wallet limit$/, async () => {
    await allActionsPage.taskActions(15);
    await allActionsPage.balanceAmount()
    await allActionsPage.showMoreAction();
    await allActionsPage.selectPendingAction();
    await allActionsPage.updatedBalance();
  });
  Then(/^User is enrolling a task then Checking the pending task status and completing the task$/, async () => {
    await allActionsPage.taskActions(6);
    await allActionsPage.pendingActionslist();
    await allActionsPage.verifyAndCompletePendingActions();
  });
  When(/^Launching the exisiting customer to validate Transaction history$/,
    async () => {
      await loginPage.open(consumerDetailsData.consumerCode1);
    }
  );
  Then(/^User is checking recent activity status$/,async ()=>{
    await allActionsPage.verifyStatusOfRecentActivities()
  })
  Then(/^User is checking spents in history$/, async () => {
    const availableSpents = await allActionsPage.getAvailableSpents();
    console.log("available Spents+++++++++++++", availableSpents);
    await allActionsPage.actionOnShowAllTransactions();
    await allActionsPage.verifyStatusOfAllTransactions();
    const totalHistory = await allActionsPage.getTransactionHistory();
    console.log("++++++++++++++++calculate", totalHistory);
    expect(availableSpents).toEqual(totalHistory);
  });
  Then(/^User is checking transaction Dates$/,async()=>{
      await allActionsPage.verifyTransactionMonths();
  })
  Then(/^User is checking the send button and enrolling all the tasks to reach the max limit and then validate the message before and after completing the entries$/, async () => {
    await allActionsPage.validateSendButtonIcon();
    await allActionsPage.completeTasks();
    await allActionsPage.verifyAndCompletePendingActions();
    await allActionsPage.verifyTopRatedGiftCard();
    await allActionsPage.validateCongratulationMessage();
  });
  Then(/^User is enrolling one tasks and validating the redemption balance$/, async () => {
    //await allActionsPage.validateRedemButton();
    await allActionsPage.taskActions(4);
    await allActionsPage.verifyAndCompletePendingActions();
    await allActionsPage.validateRedemptionBalance();
    await allActionsPage.validateSelectGiftCard();
})

