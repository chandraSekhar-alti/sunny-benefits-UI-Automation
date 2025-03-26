const fs = require("fs");
const { assert } = require("chai");
const utilTools = require("../../../utils/tools");
var sweepstakesDataFeed = require("../../../data/sweepstakesData.json");
require("dotenv").config();
let entryHeader_ActionsPage;
let entryVal_ActionsPage;

class sweepstakesPage {
  walletEntry() {
    return $(`//div[@class='entry-main']/h3`);
  }
  selectEntries(option) {
    return $(
      `//h2[contains(text(),'Actions for you')]/parent::div/following-sibling::div[${option}]//h5`
    );
  }
  scheduleTodayBtn() {
    return $(`//button[contains(text(),'Schedule Today')]`);
  }
  enrollBtnToPending() {
    return $(`//div[@class="task-action"]/button`);
  }
  selectPendingEnties(option) {
    return $(
      `//h2[contains(text(),'Pending actions')]/parent::div/following-sibling::div[${option}]`
    );
  }
  entriesVal() {
    return $(`//span[@class='earn-heading']`);
  }
  entryHeader() {
    return $(`//div[contains(@class,'task-heading')]/h3`);
  }
  completeActionCheckbox() {
    return $(`//span[contains(text(),'Complete Action')]/parent::div//input`);
  }
  taskAlertCheckbox() {
    return $(`//div[@class='alertContent']/input[@id='myButton']`);
  }
  completionDateInput() {
    return $(`//input[@id='date-picker']`);
  }
  datePreviousMonthArrow(){
    return $(`//button[@aria-label="Previous Month"]`);
  }
  dateNextMonthArrow(){
    return $(`//button[@aria-label="Next Month"]`);
  }
  dateSelectDatePicker(date) {
    return $(
      `(//div[@class='react-datepicker__week']/div[text()='${date}'])[1]`
    );
  }
  previousMonthDateSelectDatePicker(date) {
    return $(
      // `//div[@class='react-datepicker__month']/div[text()='${date}']`
      `//div[@class='react-datepicker__week react-datepicker__week--keyboard-selected']/div[text()='${date}']`
    );
  }
  markCompleteBtn() {
    return $(`//button[contains(text(),'Mark Complete')]`);
  }
  completionTextVal() {
    return $(`//span[@class='confirmation']`);
  }

  recentActivity() {
    return $(
      `//h2[contains(text(),'Recent activity')]/ancestor::section//h3[@class='mb-0 date-text-dotted']`
    );
  }
  doneToggleBtnText() {
    return $(`//div[@class='task-action-toggle']/span`);
  }
  entryStatus_pending() {
    return $(
      `//div[@class='task-modal-footer modal-footer']//span[@class='status']`
    );
  }
  entryStatus_completed() {
    return $(
      `//div[@class='task-modal-footer modal-footer']//span[@class='pending-text']`
    );
  }
  selectTriviaTask() {
    return $(`//h5[contains(text(),'Play Monthly Trivia')]`);
  }
  entriesHeaderText() {
    return $(
      `//h2[contains(text(),'Actions for you')]/parent::div[1]/following-sibling::div//h5`
    );
  }
  triviaTaskPlayNowBtn() {
    return $(`//div[@class='trivia-btn']/button`);
  }
  triviaTaskClose() {
    return $(`//div[@class='section-trivia-Q']//img`);
  }
  successMessageInActionsForYou() {
    return $(
      `//h2[contains(text(),'Actions for you')]/parent::div[1]/following-sibling::div//p`
    );
  }
  showMoreActions(){
    return $(`//p[contains(text(),'Show more actions')]`);
  }

  pendingSection(){
    return $(`//button[contains(text(),'Pending')]`);
  }

  pendingActionCrossImg(){
    return $(`//div[@class="pending-actions"]/div[1]`);
  }

  pendingActionViewAvaiableActionsBtn(){
    return $(`//div[@id='pills-profile']//button[contains(text(),'View available actions')]`);
  }

  pendingActionMsg(){
    return $(`//div[@id='pills-profile']//h5`);
  }

  completedSection(){
    return $(`//button[contains(text(),'Completed')]`);
  }

  // completedActionCrossImg(){
  //   return $(`//div[@class="pending-actions"]/div[1]`);
  // }

  completedActionViewAvaiableActionsBtn(){
    return $(`//div[@id='pills-contact']//button[contains(text(),'View available actions')]`);
  }

  completedActionMsg(){
    return $(`//div[@id='pills-contact']//h5`);
  }

  helpBtn(){
    return $(`//div[@class='help-button']`);
  }
  learnMoreBtn(){
    return $(`//button[contains(text(),'Learn More')]`);
  }
  learnMoreMsg(){
    return $(`//h4[@class='entry-work fw-bold']`);
  }
  learnMoreCloseBtn(){
    return $(`//button[@class='sweepStakesModalBtn']`);
  }

  officialRulesLink(){
    return $(``);
  }

  pendingActionsLabel_landingPage(){
    return $(`//h2[contains(text(),'Pending actions')]`);
  }

  recentActLabel_landingPage(){
    return $(`//h2[contains(text(),'Recent activity')]`);
  }

  termsAndService(){
    return $(`//span[contains(text(),'Terms of Service')]`)
  }

  termsAndServicelabel(){
    return $(`//div[@id='app']//h2`);
  }

  backBtn(){
    return $(`//div[@class='icon-image-back']`)
  }

  async sweepstakesEntries() {
    await browser.pause(4000);
    let walletEntries = await this.walletEntry().getText();
    assert.equal(
      walletEntries,
      sweepstakesDataFeed.assertData.WalletHeaderEntryVal
    );
    assert.isTrue(await this.selectEntries(1).isDisplayed());
    await this.selectEntries(1).click();
    await browser.pause(4000);
    entryHeader_ActionsPage = await this.entryHeader().getText();
    console.log("%%%%%%%%%%%%%%%%%%%%%% : " + entryHeader_ActionsPage);
    entryVal_ActionsPage = await this.entriesVal().getText();
    console.log("%%%%%%%%%%%%%%%%%%%%%% : " + entryVal_ActionsPage);
    await browser.pause(1000);
    assert.isTrue(await this.scheduleTodayBtn().isDisplayed());
    await this.scheduleTodayBtn().click();
    await browser.pause(4000);
    const currentWindowHandle = await browser.getWindowHandle();
    const allWindowHandles = await browser.getWindowHandles();
    const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
    if (currentIndex < allWindowHandles.length - 1) {
      await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
      await browser.pause(2000);
      await browser.closeWindow();
      await browser.pause(2000);
      await browser.switchToWindow(currentWindowHandle);
    } else {
      console.log("There is no next tab to close.");
    }
  }

  async selectEnrtyFromPendingActions(){
    await browser.pause(5000);
    await this.selectPendingEnties(1).scrollIntoView();
    await browser.pause(3000);
    await this.selectPendingEnties(1).click();
  }

  async validatingEntryValuesInPendingActions(){
    await browser.pause(1000);
    let entryVal = await this.entriesVal().getText();
    console.log("-------------Entry Value-------- : " + entryVal);
    await browser.pause(1000);
    let entryHeaderVal = await this.entryHeader().getText();    
    console.log("----- Enry Header ----------- : " + entryHeaderVal);
    let entryStatusVal = await this.entryStatus_pending().getText();
    console.log("---------------Status--------- : " + entryStatusVal);
    assert.equal(entryHeader_ActionsPage, entryHeaderVal);  
    assert.equal(sweepstakesDataFeed.assertData.EntryPendingStatus, entryStatusVal);
    await browser.pause(1000);
    await this.termsAndService().click();
    await this.termsAndServicelabel().waitForDisplayed({ timeout: 5000 });
    let headerVal = await this.termsAndServicelabel().getText();
    await this.backBtn().click();
    await browser.pause(1000);
    assert.equal(headerVal, sweepstakesDataFeed.assertData.TermsAndServiceLabelVal); 
  }

  async completeTaskInSweepstakes() {
    await browser.pause(3000);
    await this.completeActionCheckbox().waitForDisplayed({ timeout: 5000 });
    await this.completeActionCheckbox().click();
    await browser.pause(1000);
    await this.taskAlertCheckbox().waitForDisplayed({ timeout: 5000 });
    await this.taskAlertCheckbox().click();
    await browser.pause(1000);
    let conformationMsg = await this.completionTextVal().getText();
    console.log("-------------ConformationMsg--------------- : " + conformationMsg);
    assert.equal(
      sweepstakesDataFeed.assertData.ConformationText,
      conformationMsg
    );
    await this.completionDateInput().click();
    const today = new Date();
    const todayDate = parseInt(today.getDate(), 10);
    console.log("today's date >> " + todayDate);
    await browser.pause(1000);
    await this.dateSelectDatePicker(todayDate).click();
    await browser.pause(1000);
    await this.markCompleteBtn().click();
    await browser.pause(8000);
    await this.recentActivity().scrollIntoView();
    await browser.pause(1000);
    await this.recentActivity().click();
    await browser.pause(1000);
    let entryCompleteStatus = await this.entryStatus_completed().getText();
    console.log("-----------status------------ : " + entryCompleteStatus);
    assert.equal(
      sweepstakesDataFeed.assertData.EntryCompleteStatus,
      entryCompleteStatus
    );
    let doneLabelVal = await this.doneToggleBtnText().getText();
    console.log("-----------doneLabelVal------------ : " + doneLabelVal);
    assert.equal(sweepstakesDataFeed.assertData.DoneLabelText, doneLabelVal);
    await browser.pause(5000);
  }
  async selectSecondSweepstakesEntry() {
    await browser.pause(4000);
    assert.isTrue(await this.selectEntries(1).isDisplayed());
    await this.selectEntries(1).click();
    await browser.pause(4000);
    if ((await this.scheduleTodayBtn().isDisplayed()) == "true") {
      await browser.pause(1000);
      await this.scheduleTodayBtn().click();
    } else {
      await browser.pause(1000);
      await this.enrollBtnToPending().click();
    }
    await browser.pause(4000);
    const currentWindowHandle = await browser.getWindowHandle();
    const allWindowHandles = await browser.getWindowHandles();
    const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
    if (currentIndex < allWindowHandles.length - 1) {
      await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
      await browser.pause(2000);
      await browser.closeWindow();
      await browser.pause(2000);
      await browser.switchToWindow(currentWindowHandle);
    } else {
      console.log("There is no next tab to close.");
    }
  }

  async enrollTriviaTaskToPending() {
    await browser.pause(10000);
    await this.triviaTaskPlayNowBtn().click();
    await this.triviaTaskClose().click();
  }

  async selectAllSweepsteaksEnties() {
    await browser.pause(5000);
    let walletEntries = await this.walletEntry().getText();
    console.log(
      "--------------walletEntries----------------- :" + walletEntries
    );
    assert.equal(
      walletEntries,
      sweepstakesDataFeed.assertData.WalletHeaderEntryVal
    );
    for (let i = 0; i < 40; i++) {
      await browser.pause(1000);
      console.log("entered for loop : " + i);
      let entryBoolean = await this.selectEntries(1).isDisplayed();
      console.log("------------------------------ : " + entryBoolean);
      await browser.pause(1000);
      if ((await this.selectEntries(1).isDisplayed()) == true) {
        let entryVal = await this.entriesHeaderText().getText();
        console.log(
          "---------------entryVal--------------------- : " + entryVal
        );
        await browser.pause(1000);
        await this.selectEntries(1).click();
        await browser.pause(1000);
        entryHeader_ActionsPage = await this.entryHeader().getText();
        console.log(
          "-------------Entry Header---------------- : " +
            entryHeader_ActionsPage
        );
        entryVal_ActionsPage = await this.entriesVal().getText();
        console.log(
          "-------------Entry Value----------------- : " + entryVal_ActionsPage
        );
        assert.isTrue(await this.enrollBtnToPending().isDisplayed());
        await this.enrollBtnToPending().click();
        await browser.pause(3000);
        const currentWindowHandle = await browser.getWindowHandle();
        await browser.pause(2000);
        const allWindowHandles = await browser.getWindowHandles();
        const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
        if (currentIndex < allWindowHandles.length - 1) {
          await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
          await browser.closeWindow();
          await browser.pause(2000);
          await browser.switchToWindow(currentWindowHandle);
          await browser.pause(2000);
        } else {
          console.log("There is no next tab to close.");
        }
      } else {
        break;
      }
    }
    let successMsgText = await this.successMessageInActionsForYou().getText();
    console.log("----------------successMsgText--------------- : " + successMsgText);
    assert.equal(successMsgText, sweepstakesDataFeed.assertData.SuccessMsgInActionForYou);
  }

  async showMoreActionsPage(){
    await browser.pause(3000);
    await this.showMoreActions().scrollIntoView();
    await browser.pause(3000);
    await this.showMoreActions().click();
  }
  async validatingPendingActionMsg(){
    await this.pendingSection().click();
    await this.pendingActionCrossImg().click();
    assert.isTrue(await this. pendingActionViewAvaiableActionsBtn().isDisplayed());
    let pendingActionMessageVal = await this.pendingActionMsg().getText();
    console.log("Actual Pending Action Message :" +pendingActionMessageVal);
    console.log("Expected Pending Action Message :" +sweepstakesDataFeed.assertData.NoPendingActionsMessage);
    assert.equal(pendingActionMessageVal, sweepstakesDataFeed.assertData.NoPendingActionsMessage);
  }

  async validatingCompleteActionMsg(){
    await browser.pause(3000);
    await this.completedSection().click();
    assert.isTrue(await this. completedActionViewAvaiableActionsBtn().isDisplayed());
    let completedActionMessageVal = await this.completedActionMsg().getText();
    console.log("Actual Completed Action Message :" +completedActionMessageVal);
    console.log("Expected Completed Action Message :" +sweepstakesDataFeed.assertData.NoCompletedActionsMessage);
    assert.equal(completedActionMessageVal, sweepstakesDataFeed.assertData.NoCompletedActionsMessage);
  }

  async validateHelpBtn(){
    await browser.pause(10000);
    await this.helpBtn().waitForDisplayed({ timeout: 5000 });
    assert.isTrue(await this.helpBtn().isDisplayed());
  }
  async validateLearnMoreBtn(){
    await this.learnMoreBtn().waitForDisplayed({ timeout: 5000 });
    assert.isTrue(await this.learnMoreBtn().isDisplayed());
    await this.learnMoreBtn().click();
    let msgTxt = await this.learnMoreMsg().getText();
    assert.equal(msgTxt, sweepstakesDataFeed.assertData.learnMoreBtnMsgTxt);
    await this.learnMoreCloseBtn().click();
  }

  async validatStartEarningEntriesLabel(){
    await browser.pause(4000);
    let walletEntries = await this.walletEntry().getText();
    assert.equal(walletEntries, sweepstakesDataFeed.assertData.WalletHeaderEntryVal);
  }
  async validateOfficialRulesLnk(){

  }

  async validatePendingActionsLandingPg(){
    await browser.pause(4000);
    assert.isFalse(await this.pendingActionsLabel_landingPage().isDisplayed());
  }

  async validateRecentActivitiesLandingPg(){
    await browser.pause(4000);
    assert.isFalse(await this.recentActLabel_landingPage().isDisplayed());
  }
  async validateDateRangeOfATask(){
    await browser.pause(3000);
    await this.completeActionCheckbox().waitForDisplayed({ timeout: 5000 });
    await this.completeActionCheckbox().click();
    await browser.pause(1000);
    await this.taskAlertCheckbox().waitForDisplayed({ timeout: 5000 });
    await this.taskAlertCheckbox().click();
    await browser.pause(1000);
    await this.completionDateInput().click();
    const today = new Date();
    const todayDate = parseInt(today.getDate(), 10) + 1;
    console.log("today's date >> " + todayDate);
    await browser.pause(1000);
    await this.datePreviousMonthArrow().click();
    await browser.pause(3000);
    console.log("-------previous month arrow is displayed------- : " +await this.datePreviousMonthArrow().isDisplayed());
    assert.isFalse(await this.datePreviousMonthArrow().isDisplayed());
    await this.dateNextMonthArrow().click();
    await browser.pause(3000);
    console.log("-------next month arrow is displayed------- : " +await this.dateNextMonthArrow().isDisplayed());
    assert.isFalse(await this.dateNextMonthArrow().isDisplayed());
    await this.datePreviousMonthArrow().click();
    await browser.pause(3000);
    await this.previousMonthDateSelectDatePicker(todayDate).click();
    await browser.pause(1000);
    await this.markCompleteBtn().click();
    await browser.pause(8000);
    await this.recentActivity().scrollIntoView();
    await browser.pause(1000);
    await this.recentActivity().click();
    await browser.pause(1000);
    let entryCompleteStatus = await this.entryStatus_completed().getText();
    console.log("-----------status------------ : " + entryCompleteStatus);
    assert.equal(
      sweepstakesDataFeed.assertData.EntryCompleteStatus,
      entryCompleteStatus
    );
    let doneLabelVal = await this.doneToggleBtnText().getText();
    console.log("-----------doneLabelVal------------ : " + doneLabelVal);
    assert.equal(sweepstakesDataFeed.assertData.DoneLabelText, doneLabelVal);
    await browser.pause(5000);
  }
}

module.exports = new sweepstakesPage();
