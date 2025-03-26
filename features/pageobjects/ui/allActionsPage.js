const axios = require("axios");
const fs = require("fs");
const { assert, expect } = require("chai");
const utilTools = require("../../../utils/tools");
const assertdatas = require("..//..//../data/rewardsData.json");
require("dotenv").config();
let initialBalance;
let updatedBalances;
let updatedBalancesNum;
let maxLimit;
let consumerDetailsData = require("../../../data/consumerDetails.json");
let ApiAssertQues = require(`../../../data/QuestionAssert.json`);

class triviaTask {
  ftue() {
    return $(`//button[text()='Get Started']`);
  }
  triviaClose() {
    return $(`//div[@class="text-end"]/img`);
  }
  actionsForYou() {
    return $(`//h5[text()='Play Monthly Trivia']`);
  }
  playNow() {
    return $(`//button[text()='Play Now!']`);
  }
  pendingActionsectionLabel() {
    return $(`//h2[text()='Pending actions']`);
  }
  question() {
    return $(`//div[@class='first-section-trivia-qns']//div/h4`);
  }
  options(i) {
    return $(`(//button[@class='text-center false'])[${i}]`);
  }
  doneButton() {
    return $(`//button[text()='Done']`);
  }
  getGiftCard(i) {
    return $('(//div[@class="gift-card"])[' + i + "]");
  }
  redemGiftCard() {
    return $('(//div[@class="gift-card"])[1]');
  }
  activeGiftCardPanel() {
    return $('//div[contains(@class,"checkout-panel__view--active")]');
  }
  activeGiftCardPanelAmountCount() {
    return $$('//div[contains(@class,"clickable-card")]/p');
  }
  activeGiftCardPanelAmount(i) {
    return $('(//div[contains(@class,"clickable-card")]/p)[' + i + "]");
  }
  getSpendAmount() {
    return $('(//p[text()="Spend amount"]//following::p)[1]');
  }
  getPrizeDiscount() {
    return $('//strong[contains(text(),"Prizeout bonus")]');
  }
  getprizeBonusAmount() {
    return $('//strong[contains(text(),"Prizeout bonus")]//following::strong');
  }
  getTotalAmountYouGet() {
    return $('(//p[text()="Your gift card amount"]//following::p)[1]');
  }
  answerlabel() {
    return $(`(//div[@class='question-mark-image mb-16']//following::p)[1]`);
  }
  nextButton() {
    return $(`//button[text()='Next question']`);
  }
  tasks(options) {
    return $(
      `//h2[contains(text(),'Actions for you')]/parent::div/following-sibling::div[${options}]`
    );
  }
  taskButton() {
    return $(`//div[@class='task-action']/button`);
  }

  pendingActions(option) {
    return $(
      `//h2[contains(text(),'Pending actions')]/parent::div/following-sibling::div[${option}]`
    );
  }
  showMoreActions() {
    return $(`//p[contains(text(),'Show more actions')]`);
  }
  pendingActionSection() {
    return $(`//button[text()='Pending']`);
  }
  pendingTasksList() {
    //return $$(`//div[@id='pills-profile']//section/div[1]//div[contains(@class,'part-two mx-3')]`)
    return $$(`//div[@id='pills-profile']//section/div`);
  }
  pendingTasks(taskId) {
    return $(`//div[@id='pills-profile']//section/div[${taskId}]`);
  }

  completeButtonToggle() {
    return $(
      `//input[contains(@class,'form-check-input border-0 shadow-none')]`
    );
  }
  closeIcon() {
    return $(`//div[@class='cross-img']`);
  }
  taskAlertCheckbox() {
    return $(`//div[@class='alertContent']/input[@id='myButton']`);
  }
  completionDateInput() {
    return $(`//input[@id='date-picker']`);
  }
  dateSelectDatePicker(date) {
    return $(
      `(//div[@class='react-datepicker__week']/div[text()='${date}'])[1]`
    );
  }
  markCompleteBtn() {
    return $(`//button[contains(text(),'Mark Complete')]`);
  }

  backBtn() {
    return $(`//div[@class='modal-title h4']`);
  }
  pendingTaskPrice() {
    return $(`//span[@class='earn-heading']`);
  }
  pendingTaskName() {
    return $(`//div[@class='task-heading ']/h3`);
  }
  backbuttonActionspage() {
    return $(`//div[@class='task-svg-wrapper']`);
  }
  completedTask() {
    return $(`//div[@class='recent']/following-sibling::div[1]`);
  }
  completedTaskName() {
    return $(`//div[@id="pills-contact"]//h5`);
    //h2[contains(text(),'Recent activity')]/parent::div/following-sibling::div[1]//h3[1]`
  }
  getPrizeoutLogo() {
    return $('//img[@class="logo"]');
  }
  getAvialableBalance() {
    return $('//div[@class="user-balance"]/p');
    //return $('//div[@class="clickable-card"]')
  }
  getGiftCardCounts() {
    return $$('//div[@class="gift-card"]');
  }
  termsAndConditions() {
    return $(`//div[@class='task-heading ']/span`);
  }
  termsConditionsText() {
    return $(`//h2[contains(@class,'transaction')]`);
  }
  termsandCondCloseButton() {
    return $(`//div[@class='icon-image-back']`);
  }
  completed() {
    return $(`//button[@id='pills-contact-tab']`);
  }
  completedTask1() {
    return $(
      `//div[@id='pills-profile']/following-sibling::div//section/div[1]`
    );
  }
  completedtasktext() {
    return $(
      `//div[@id='pills-profile']/following-sibling::div//section/div[1]//h5`
    );
  }
  doneToggleButton() {
    return $(`//div[@class='task-action-toggle']/span`);
  }
  taskPendingStatus() {
    return $(`//div[@class='00000']/span`);
  }
  taskCompletedStatus() {
    return $(`//div[@class='d-flex align-items-center']/span`);
  }
  cancelComplete() {
    return $(`//div[@class='swal2-actions']/button[3]`);
  }
  pendingTasksection() {
    return $$(`//div[@class='trending']/following-sibling::div`);
  }
 getConfirmButton(){
  return $('//button[text()="Confirm"]')
 }
  pendingActionTaskCount() {
    return $$(
      `//h2[text()='Pending actions']/ancestor::section//div[@class='main-wrap ']`
    );
  }
  walletbalanceAmount() {
    return $(`//div[@class='side-left']//h2`);
  }
  actionsPageBackButton() {
    return $(`//div[@class='icon-image-back set-back']`);
  }
  maxWalletLimit() {
    return $(`//div[@class='space-exit ']//h4`);
  }
  nopendinghActionslabel() {
    return $(`//div[@id='pills-profile']//section//h5`);
  }
  getCloseButton(){
    return $('(//i[contains(@class,"fa-prizeout-close")])[2]')
  }
  spinwheelTask() {
    return $(`//h5[text()='Spinwheel']`);
  }
  walletWithoutBalance() {
    return $(`//section[@class='zero-wrapper mx-1']`);
  }
  walletWithZerobalance() {
    return $(`//section[@class='main-wrapper']`);
  }
  redeemButton() {
    return $(`//button[text()='Redeem']`);
  }
  helpButtonInHomepage() {
    return $(`//div[@class='help-button']`);
  }
  getPendingActions(index) {
    return $(
      '(//h2[text()="Pending actions"]/following::div[@class="main-wrap "])[' +
        index +
        "]"
    );
  }

  getStatusModalBox() {
    return $('//div[@class="modal-content"]');
  }
  actionOnCompleteCheckbox() {
    return $('//input[@id="flexSwitchCheckChecked"]');
  }
  getMarkCompletePopUp() {
    return $('//div[@id="swal2-html-container"]');
  }
  actionOnCheckbox() {
    return $('//input[@id="myButton"]');
  }
  selectDate() {
    return $('//input[@id="date-picker"]');
  }
  selectCurrentDate(date) {
    return $(`//div[text()=${date}]`);
  }
  availableSpents() {
    return $(`//p[text()='Available to spend']/following-sibling::h2`);
  }
  recentActivities(i) {
    return $('(//div[contains(@class,"text-button")]//h4)[' + i + "]");
  }
  count() {
    return $$(`//div[contains(@class,'text-button')]//h4`);
  }
  showAllTransactions() {
    return $("//p[normalize-space()='Show all transactions']");
  }
  getThisMonth() {
    return $("//h3[normalize-space()='This Month']");
  }
  getDate() {
    return $("(//h3[normalize-space()='This Month']/following::h6)[1]");
  }
  previousMonthCount() {
    return $$("//h3[normalize-space()='Previous Transactions']/following::h6");
  }
  previousMonth() {
    return $("//h3[normalize-space()='Previous Transactions']/following::h6");
  }
  previousMonths(i) {
    return $(
      '(//h3[normalize-space()="Previous Transactions"]/following::h6)[' +
        i +
        "]"
    );
  }
  getRecentActivitiesSection() {
    return $('//h5[normalize-space()="Completed"]');
  }
  getRecentActivitiesLength() {
    return $$('//h5[normalize-space()="Completed"]');
  }
  getStatusOfCompleted(index) {
    return $('(//h5[normalize-space()="Completed"])[' + index + "]");
  }
  getStatusModalBox() {
    return $('//div[@class="modal-content"]');
  }
  actionOnBackButton() {
    return $('//div[contains(@class,"modal-title")]');
  }
  getStatusOfDone() {
    return $('//span[normalize-space()="Done"]');
  }
  activityLabel(index) {
    return $('(//h3[contains(@class,"date-text-dotted")])[' + index + "]");
  }
  getSendButton() {
    return $('//div[contains(@class,"icons")]');
  }
 getConfirmingGiftCard(){
  return $('//h2[@class="full-screen-overlay__heading"]')
 }
  getExitModalBox() {
    return $('//div[@class="modal-content"]');
  }
  getExitButton() {
    return $('//button[text()="Exit"]');
  }

  getCancelButton() {
    return $('//button[text()="cancel"]');
  }

  getShowMoreActions() {
    return $('//p[text()="Show more actions"]');
  }

  getTasksCount() {
    return $$('//div[@class="main-wrap "]/div/div');
  }

  getTasks(index) {
    return $('(//div[@class="main-wrap "]/div/div)[' + index + "]");
  }

  actionOnTasks() {
    return $('//div[@class="task-action"]/button');
  }

  actionOnGobackButton() {
    return $('//div[contains(@class,"set-back")]');
  }
  getLimit() {
    return $('//div[@class="chart-text "]/h2');
  }
  actionOnCancelIcon() {
    return $('//button[@class="sweepStakesModalBtn"]');
  }

  getTopRatedPrizeLabel() {
    return $('//h4[text()="Top-rated Gift Cards"]');
  }

  getprizeImage() {
    return $('//div[contains(@class,"prize-left")]/img');
  }
  getprizeName() {
    return $('//div[contains(@class,"prize-right")]/h4');
  }
  getLearnMoreBtn() {
    return $('//button[text()="Learn More"]');
  }
  getLearnMorePopUp() {
    return $('//div[@class="modal-content"]');
  }
  getCongratulationLabel() {
    return $('//section/div/p[contains(@class,"action-content")]');
  }
  getSelectGiftCard() {
    return $('(//button[text()="Select Gift Card"])[1]');
  }
  getTask() {
    return $('//div[@class="main-wrap "]/div/div');
  }
  getTasks(index) {
    return $('(//div[@class="main-wrap "]/div/div)[' + index + "]");
  }
  getCopyRight(){
    return $('//p[@class="copyright"]')
  }
  getPrizeOutTerms(){
    return $('(//li[@class="footer__link"])[1]')
  }
  getPrivacyPolicy(){
    return $('(//li[@class="footer__link"])[2]')
  }
  getOrderConfirmed(){
    return $('//h1[text()="Order confirmed"]')
  }
  getCoinBase(){
    return $('(//p[text()="Coinbase"])[3]')
  }
  getCheckoutConfirmation(){
    return $('//div[@class="checkout-confirmation__confirmation-details"]')
  }
  getViewGiftCard(){
    return $('(//span[text()="View gift card"])[1]')
  }
  async triviaQuestions() {
    for (let i = 1; i < 5; i++) {
      await this.selectOptions(i);
      if (i == 4) {
        break;
      } else {
        await this.nextButton().click();
        await browser.pause(3000);
      }
    }
    await this.doneButton().click();
    await browser.pause(2000);
    //await this.selectwrongoption();
  }
  async selectOptions(i) {
    await browser.pause(2000);
    let questionVal = await this.question().getText();
    console.log("ui question", questionVal);
    console.log("assert", ApiAssertQues[`question_${i - 1}`]);
    assert.equal(questionVal, ApiAssertQues[`question_${i - 1}`]);
    await browser.pause(2000);
    for (let j = 1; j < 3; j++) {
      let optionVal = await this.options(j).getText();
      let expectedOptionVal = ApiAssertQues[`options_${i - 1}`][j - 1];
      // Assertion
      assert.equal(optionVal, expectedOptionVal);
      // Logging the values
      console.log("Actual option value:", optionVal);
      console.log("Expected option value:", expectedOptionVal);
      await browser.pause(2000);
      console.log("rta next button in j" + j);
    }
    let optVal = parseInt(ApiAssertQues[`answer_${i - 1}`]);
    console.log("+++", optVal);
    let selector1 = optVal + 1;
    console.log("---", selector1);
    await this.options(selector1).click();
    let iconVal = await this.answerlabel().getText();
    assert.equal(iconVal, "CORRECT");
    console.log(iconVal);
    await browser.pause(2000);
    console.log("rta next button" + i);
  }
  async clickOnDone() {
    await this.doneButton().click();
    await browser.pause(2000);
  }
  async selectwrongoption() {
    await browser.pause(2000);
    let questionVal = await this.question().getText();
    console.log(questionVal);
    assert.equal(questionVal, ApiAssertQues.question_4);
    await browser.pause(2000);
    for (let j = 1; j < 4; j++) {
      let optionVal = await this.options(j).getText();
      assert.equal(optionVal, ApiAssertQues.options_4[j - 1]);
      console.log(optionVal);
      console.log("================== " + ApiAssertQues.options_4[j - 1]);
      await browser.pause(2000);
    }
    let optVal = parseInt(ApiAssertQues.answer_4);
    console.log("+++", optVal);
    let selector1 = optVal + 2;
    console.log("---", selector1);
    await this.options(selector1).click();
    let iconVal = await this.answerlabel().getText();
    assert.equal(iconVal, "INCORRECT");
    await browser.pause(2000);
    await this.doneButton().click();
    await browser.pause(2000);
  }
  async taskActions(tasklength) {
    await browser.pause(20000);
    for (let j = 2; j < tasklength; j++) {
      await browser.pause(3000);
      await this.tasks(2).scrollIntoView();
      if (await this.spinwheelTask().isDisplayed()) {
        console.log("Skipping task due to spinwheel");
        continue;
      }
      await browser.pause(2000);
      await this.tasks(2).click();
      await this.taskButton().click();
      await browser.pause(2000);
      const currentWindowHandle = await browser.getWindowHandle();
      console.log(" new tab" + currentWindowHandle);
      const allWindowHandles = await browser.getWindowHandles();
      const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
      console.log("+ count" + allWindowHandles);
      if (currentIndex < allWindowHandles.length - 1) {
        // Switch to the next tab
        await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
        await browser.pause(4000);
        // Close the next tab
        await browser.closeWindow();
        await browser.pause(4000);
        // Switch back to the original tab
        await browser.switchToWindow(currentWindowHandle);
        await browser.pause(5000);
      } else {
        console.log("There is no next tab to close.");
      }
    }
  }
  async showMoreAction() {
    await browser.pause(2000);
    await this.showMoreActions().scrollIntoView();
    await browser.pause(2000);
    await this.showMoreActions().click();
    await browser.pause(5000);
    await this.pendingActionSection().click();
    await browser.pause(10000);
    await this.closeIcon().click();
  }
  async selectPendingAction() {
    const arrayLength = await this.pendingTasksList().length;
    console.log("#" + arrayLength);
    for (let i = 1; i < arrayLength + 1; i++) {
      console.log("##");
      await browser.pause(2000);
      await this.pendingTasks(i).click();
      const pendingTaskName1 = await this.pendingTaskName().getText();
      const pendingTaskPrice1 = await this.pendingTaskPrice().getText();
      console.log("Task price is " + pendingTaskPrice1);
      console.log("Task name is " + pendingTaskName1);
      await browser.pause(2000);

      if ((await this.completeButtonToggle().isDisplayed()) == true) {
        await browser.pause(2000);
        const pendingtaskStatus = await this.taskPendingStatus().getText();
        assert.equal("Pending", pendingtaskStatus);
        await this.termsAndConditions().click();
        const termsandConditionText =
          await this.termsConditionsText().getText();
        console.log(termsandConditionText);
        assert.equal("Terms of Service", termsandConditionText);
        await browser.pause(2000);
        await this.termsandCondCloseButton().click();
        await browser.pause(2000);
        await this.completeButtonToggle().click(); // Click the "Complete" button
        await this.cancelComplete().click();
        await browser.pause(2000);
        await this.completeButtonToggle().click();
        await browser.pause(2000);
        await this.taskAlertCheckbox().click();
        await browser.pause(2000);
        await this.completionDateInput().click();
        const today = new Date();
        const todayDate = parseInt(today.getDate(), 10);
        console.log("today's date >> " + todayDate);
        await browser.pause(2000);
        await this.dateSelectDatePicker(todayDate).click();
        await browser.pause(2000);
        await this.markCompleteBtn().click();
        await browser.pause(2000);

        await this.completed().click();
        await browser.pause(2000);
        await this.completedTask1().click();

        await browser.pause(2000);
        // let donelabel = await this.doneToggleButton().getText();
        // assert.equal("Done", donelabel);
        await this.termsAndConditions().click();

        await browser.pause(2000);
        await this.termsandCondCloseButton().click();
        await browser.pause(2000);
        let taskCompletedStatus = await this.doneToggleButton().getText();
        console.log(taskCompletedStatus);
        await browser.pause(2000);
        assert.equal("Done", taskCompletedStatus);

        await browser.pause(2000);
        const completedtaskName = await this.completedTaskName().getText();
        await browser.pause(2000);
        console.log(completedtaskName);
        await this.backbuttonActionspage().click();
        const completedtaskName1 = await this.completedTaskName().getText();

        assert.equal(pendingTaskName1, completedtaskName1);
        await browser.pause(2000);
        await this.actionsPageBackButton().click();
        console.log("click back button in actions page");

        break;
      } else {
        await browser.pause(2000);
        await this.backBtn().click();
        console.log('No "Complete" button found for this task');
      }
    }
  }
  async balanceAmount() {
    await browser.pause(2000);
    await this.walletbalanceAmount().scrollIntoView();
    await browser.pause(2000);
    initialBalance = await this.walletbalanceAmount().getText();
    await browser.pause(2000);
    console.log(`Initial Balance: ${initialBalance}`);
  }
  async updatedBalance() {
    updatedBalances = await this.walletbalanceAmount().getText();
    await browser.pause(2000);
    updatedBalances = updatedBalances.replace(/\$/g, "");
    updatedBalancesNum = parseInt(updatedBalances, 10);
    initialBalance = initialBalance.replace(/\$/g, "");
    let initialBalanceNum = parseInt(initialBalance, 10);
    console.log("The Initial Balance is :" + initialBalanceNum);
    assert.isTrue(updatedBalancesNum > initialBalanceNum);

    expect(updatedBalancesNum).to.be.greaterThan(initialBalanceNum);
    console.log("The updated balance is : " + updatedBalancesNum);
    await browser.pause(2000);
  }

  async maxWalletBalanceLimit() {
    maxLimit = await this.maxWalletLimit().getText();
    maxLimit = maxLimit.replace(/\$/g, "");
    let maxLimitNum = parseInt(maxLimit, 10);
    if (updatedBalancesNum >= maxLimitNum) {
      console.log(
        "Wallet has reached the maximum limit. Stopping further operations."
      );
    } else {
      console.log(
        "Wallet has not reached the maximum limit. Proceeding with operations."
      );
    }
  }
  async allPendingActions() {
    await this.nopendinghActionslabel().getText();
    let noPendingLabel = await this.nopendinghActionslabel().getText();
    console.log("This is Actualresult: " + noPendingLabel);
    console.log(
      "This is Expectedresult: " + assertdatas.assertData.NopendingActionsVal
    );
    assert.equal(noPendingLabel, assertdatas.assertData.NopendingActionsVal);
  }
  async pendingActionslist() {
    await this.pendingActionsectionLabel().scrollIntoView();
    await browser.pause(2000);
    let pendingList = await this.pendingActionTaskCount().length;
    console.log("The tasks count is :" + pendingList);
    expect(pendingList).to.equal(3);
  }
  async redemptionButtonIn() {
    assert.isTrue(await this.walletWithoutBalance().isDisplayed());
    assert.isFalse(await this.redeemButton().isDislayed());
  }
  async verifyAndCompletePendingActions() {
    const currentDate = new Date().getDate();
    let i = 1;
    let count;
    while (true) {
      await browser.pause(1500);
      await this.pendingActionsectionLabel().scrollIntoView();
      count = await this.pendingActionTaskCount().length;
      console.log("count&&&&&&&&&&&&&&", count);
      await browser.pause(3000);
      if (count > i) {
        await browser.pause(500);
        await this.getPendingActions(i).scrollIntoView();
        await this.getPendingActions(i).click();
        await this.getStatusModalBox().isDisplayed();
        await browser.pause(500);
        await this.actionOnCompleteCheckbox().click();
        await this.getMarkCompletePopUp().isDisplayed();
        await browser.pause(500);
        await this.actionOnCheckbox().click();
        await this.selectDate().click();
        await this.selectCurrentDate(currentDate).click();
        await this.markCompleteBtn().click();
        // if(count==1){
        //   count=0;
        // }
      } else {
        break;
      }
    }
  }
  async verifyTopRatedGiftCard() {
    await this.getTopRatedPrizeLabel().scrollIntoView();
    await this.getTopRatedPrizeLabel().isDisplayed();
    await this.getprizeImage().isDisplayed();
    await this.getprizeName().isDisplayed();
    await this.getLearnMoreBtn().scrollIntoView();
    await this.getLearnMoreBtn().isDisplayed();
    await this.getLearnMoreBtn().click();
    await this.getLearnMorePopUp().isDisplayed();
    await browser.pause(1000);
    await this.actionOnCancelIcon().click();
    await this.getTask().scrollIntoView();
    await this.getTask().click();
    await this.actionOnTasks().click();
    await browser.pause(2000);
  }
  async validateCongratulationMessage() {
    const message = await this.getCongratulationLabel().getText();
    expect(message).to.equal(
      "Congratulations, you’ve started all available actions!"
    );
  }
  async getAvailableSpents() {
    await this.availableSpents().scrollIntoView();
    const availableSpents = await this.availableSpents().getText();
    console.log("availableSpenst++++++++++++++++", availableSpents);
    const cleanedText = availableSpents.replace(/[^\d.-]/g, "").trim();
    const parsedValue = parseFloat(cleanedText);
    return parsedValue;
  }
  async actionOnShowAllTransactions() {
    await this.showAllTransactions().scrollIntoView();
    await this.showAllTransactions().click();
    await browser.pause(5000);
  }
  async verifyStatusOfAllTransactions() {
    const count = await this.getRecentActivitiesLength().length;
    console.log("c+++++++++++", count);
    for (let i = 1; i <= count; i++) {
      const status = await this.getStatusOfCompleted(i).getText();
      expect(status).to.equal("Completed");
    }
  }
  async getTransactionHistory() {
    let total = 0;
    const length = await this.count().length;
    for (let i = 1; i <= length; i++) {
      const activities = await this.recentActivities(i).getText();
      const cleanedText = activities.replace(/[^\d.-]/g, "").trim();
      const parsedValue = parseFloat(cleanedText);
      if (!isNaN(parsedValue)) {
        total += parsedValue;
      }
    }
    return total;
  }
  async verifyTransactionMonths() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonthIndex = new Date().getMonth();
    const currentMonth = months[currentMonthIndex];
    if (await this.getThisMonth().isDisplayed()) {
      const displayedMonthText = await this.getDate().getText();
      const extractedMonth = displayedMonthText.replace(/[^a-zA-Z]/g, "");
      console.log("-----------", extractedMonth);
      expect(extractedMonth).to.equal(currentMonth);
    }
    if (await this.previousMonth().isDisplayed()) {
      const previousMonthsCount = await this.previousMonthCount().length;
      for (let i = 1; i <= previousMonthsCount; i++) {
        const previousMonthText = await this.previousMonths(i).getText();
        const extractedPreviousMonth = previousMonthText.replace(
          /[^a-zA-Z]/g,
          ""
        );
        console.log("-----------", extractedPreviousMonth);
        expect(extractedPreviousMonth).not.to.equal(currentMonth);
      }
    }
  }
  async verifyTopRatedGiftCard() {
    await this.getTopRatedPrizeLabel().scrollIntoView();
    await this.getTopRatedPrizeLabel().isDisplayed();
    await this.getprizeImage().isDisplayed();
    await this.getprizeName().isDisplayed();
    await this.getLearnMoreBtn().scrollIntoView();
    await this.getLearnMoreBtn().isDisplayed();
    await this.getLearnMoreBtn().click();
    await this.getLearnMorePopUp().isDisplayed();
    await browser.pause(1000);
    await this.actionOnCancelIcon().click();
    await this.getTask().scrollIntoView();
    await this.getTask().click();
    await this.actionOnTasks().click();
    await browser.pause(2000);
  }
  async validateSendButtonIcon() {
    await browser.pause(10000);
    await this.getSendButton().isDisplayed();
    await this.getSendButton().click();
    await this.getExitModalBox().isDisplayed();
    await this.getExitButton().click();
    await browser.pause(1000);
    await this.getExitModalBox().isDisplayed();
    await this.getCancelButton().click();
    await this.getSendButton().isDisplayed();
  }
  async completeTasks() {
    let i = 20;
    await this.getShowMoreActions().scrollIntoView();
    await this.getShowMoreActions().click();
    await browser.pause(5000);
    while (true) {
      let count = await this.getTasksCount().length;
      console.log("+++++++++++count", count);
      if (count > i) {
        await this.getTasks(i).scrollIntoView();
        await this.getTasks(i).click();
        await browser.pause(2000);
        await this.actionOnTasks().click();
        await browser.pause(3000);
        await this.actionOnGobackButton().scrollIntoView(true);
        await this.actionOnGobackButton().click();
        await browser.pause(2000);
        let text = await this.getLimit().getText();
        let limit = text.replace(/[$\s]/g, "");
        console.log("________________limit", limit);
        if (limit == "0") {
          break;
        }
        await browser.pause(1000);
        await this.getShowMoreActions().scrollIntoView();
        await this.getShowMoreActions().click();
      }
    }

    // let taskLength=await this.tasksCount().length;
    // for(let i=2;i<=taskLength;i++){
    //   await this.tasks(i).scrollIntoView();
    //   await this.tasks(i).click();
    //   await this.actionOnTasks().click();
    // }
  }
  async verifyStatusOfRecentActivities() {
    await browser.pause(2000);
    console.log("test1");
    await this.getRecentActivitiesSection().scrollIntoView();
    const count = await this.getRecentActivitiesLength().length;
    console.log("test2");
    console.log("length is ", count);
    for (let i = 1; i <= count; i++) {
      await this.getStatusOfCompleted(i).scrollIntoView();
      const status = await this.getStatusOfCompleted(i).getText();
      await this.activityLabel(i).scrollIntoView();
      const activityLabelText = await this.activityLabel(i).getText();
      console.log("s++++++++", status);
      if (!activityLabelText.includes("Gift Card")) {
        expect(status).to.equal("Completed");
        await this.getStatusOfCompleted(i).scrollIntoView();
        await this.getStatusOfCompleted(i).click();
        await browser.pause(1000);
        if (await this.getStatusModalBox().isDisplayed()) {
          console.log("if++++++++");
          const status = await this.getStatusOfDone().getText();
          console.log("s++++++++", status);
          expect(status).to.equal("Done");
          await this.actionOnBackButton().click();
        }
      }
    }
  }
  async validateRedemptionBalance() {
    let j = 1;
    const availableBalance = await this.walletbalanceAmount().getText();
    console.log("availablebalance+++++++++", availableBalance);
    await this.redeemButton().scrollIntoView();
    await this.redeemButton().isDisplayed();
    await this.redeemButton().click();
    await browser.pause(5000);
    const iframe = await $("iframe");
    await browser.switchToFrame(iframe);
    await this.getExitButton().isDisplayed();
    await this.getPrizeoutLogo().isDisplayed();
    (await this.getCopyRight()).scrollIntoView();
    (await this.getCopyRight()).isDisplayed();
    (await this.getPrizeOutTerms()).isDisplayed();
    (await this.getPrivacyPolicy()).isDisplayed()
    await browser.pause(12000);
    await this.getAvialableBalance().scrollIntoView();
    await this.getAvialableBalance().isDisplayed();
    const balance = await this.getAvialableBalance().getText();
    const prizeoutBalance = balance.split(".")[0];
    console.log("prizeoutBalance+++++++++", prizeoutBalance);
    expect(availableBalance).to.equal(prizeoutBalance);
    const count = await this.getGiftCardCounts().length;
    console.log("count___", count);
    for (let i = 1; i <= count; i++) {
      await this.getGiftCard(i).isDisplayed();
    }
    await this.redemGiftCard().click();
    await browser.pause(2000);
    await this.activeGiftCardPanel().isDisplayed();
    const amountOptions = await this.activeGiftCardPanelAmountCount().length;
    console.log("amountOptions", amountOptions);
    while (j <= amountOptions) {
      const amount = await this.activeGiftCardPanelAmount(j).getText();
      const activeAccount = parseFloat(amount.replace("$", ""));
      console.log("activeAccount", activeAccount);
      const spendAmount = await this.getSpendAmount().getText();
      console.log("spendAmount", spendAmount);
      const activeSpendAccount = parseFloat(spendAmount.replace("$", ""));
      console.log("activeSpendAccount", activeSpendAccount);
      expect(activeAccount).to.equal(activeSpendAccount);
      if (await this.getPrizeDiscount().isDisplayed()) {
        const discountPrice = await this.getprizeBonusAmount().getText();
        const activeDiscountAccount = parseFloat(
          discountPrice.replace("$", "")
        );
        console.log("activeDiscountAccount", activeDiscountAccount);
        console.log("discountPrice", discountPrice);
        const totalAmountYouGet = await this.getTotalAmountYouGet().getText();
        console.log("totalAmountYouGet", totalAmountYouGet);
        const activeTotalAmountYouGet = parseFloat(
          totalAmountYouGet.replace("$", "")
        );
        console.log("activeTotalAmountYouGet", activeTotalAmountYouGet);
        const totalAmount = parseFloat(
          activeSpendAccount + activeDiscountAccount
        );
        expect(activeTotalAmountYouGet).to.equal(totalAmount);
      } else {
        const totalAmountYouGet = await this.getTotalAmountYouGet().getText();
        console.log("totalAmountYouGet", totalAmountYouGet);
        const activeTotalAmountYouGet = parseFloat(
          totalAmountYouGet.replace("$", "")
        );
        console.log("activeTotalAmountYouGet", activeTotalAmountYouGet);
        expect(activeSpendAccount).to.equal(activeTotalAmountYouGet);
      }
      j++;
      if (await this.activeGiftCardPanelAmount(j).isDisplayed()) {
        await this.activeGiftCardPanelAmount(j).click();
      } else {
        (await this.getCloseButton()).click();
        break;
      }
    }
  }
  async validateSelectGiftCard(){
   (await this.redemGiftCard()).click();
    (await this.getSelectGiftCard()).click();
    (await this.getConfirmButton()).click();
    await browser.pause(2000);
    (await this.getConfirmingGiftCard()).isDisplayed();
    await browser.pause(2000);
    (await this.getOrderConfirmed()).isDisplayed();
    (await this.getCoinBase()).isDisplayed();
    (await this.getCheckoutConfirmation()).isDisplayed();
    (await this.getViewGiftCard()).isDisplayed();
  }
}

module.exports = new triviaTask();
