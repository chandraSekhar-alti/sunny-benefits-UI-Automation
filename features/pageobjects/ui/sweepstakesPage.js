const { assert, expect } = require("chai");
const UIActions = require('../../../utils/UIActions');
const Assertions = require('../../../utils/Assertions');
const sweepstakesDataFeed = require("../../../data/sweepstakesData.json");

class SweepstakesPage {
  // Organized selectors by functionality
  selectors = {
    wallet: {
      entry: () => $(`//div[@class='entry-main']/h3`),
      balanceAmount: () => $(`//div[@class='side-left']//h2`)
    },
    actions: {
      entries: (option) => $(`//h2[contains(text(),'Actions for you')]/parent::div/following-sibling::div[${option}]//h5`),
      scheduleToday: () => $(`//button[contains(text(),'Schedule Today')]`),
      enrollButton: () => $(`//div[@class="task-action"]/button`),
      showMore: () => $(`//p[contains(text(),'Show more actions')]`),
      successMessage: () => $(`//h2[contains(text(),'Actions for you')]/parent::div[1]/following-sibling::div//p`),
      entriesHeader: () => $(`//h2[contains(text(),'Actions for you')]/parent::div[1]/following-sibling::div//h5`)
    },
    pending: {
      entries: (option) => $(`//h2[contains(text(),'Pending actions')]/parent::div/following-sibling::div[${option}]`),
      section: () => $(`//button[contains(text(),'Pending')]`),
      crossImage: () => $(`//div[@class="pending-actions"]/div[1]`),
      viewActions: () => $(`//div[@id='pills-profile']//button[contains(text(),'View available actions')]`),
      message: () => $(`//div[@id='pills-profile']//h5`),
      label: () => $(`//h2[contains(text(),'Pending actions')]`)
    },
    completed: {
      section: () => $(`//button[contains(text(),'Completed')]`),
      viewActions: () => $(`//div[@id='pills-contact']//button[contains(text(),'View available actions')]`),
      message: () => $(`//div[@id='pills-contact']//h5`)
    },
    task: {
      entryValue: () => $(`//span[@class='earn-heading']`),
      entryHeader: () => $(`//div[contains(@class,'task-heading')]/h3`),
      completeCheckbox: () => $(`//span[contains(text(),'Complete Action')]/parent::div//input`),
      alertCheckbox: () => $(`//div[@class='alertContent']/input[@id='myButton']`),
      completionText: () => $(`//span[@class='confirmation']`),
      dateInput: () => $(`//input[@id='date-picker']`),
      datePrevMonth: () => $(`//button[@aria-label="Previous Month"]`),
      dateNextMonth: () => $(`//button[@aria-label="Next Month"]`),
      markComplete: () => $(`//button[contains(text(),'Mark Complete')]`),
      doneToggle: () => $(`//div[@class='task-action-toggle']/span`),
      statusPending: () => $(`//div[@class='task-modal-footer modal-footer']//span[@class='status']`),
      statusCompleted: () => $(`//div[@class='task-modal-footer modal-footer']//span[@class='pending-text']`)
    },
    trivia: {
      task: () => $(`//h5[contains(text(),'Play Monthly Trivia')]`),
      playNow: () => $(`//div[@class='trivia-btn']/button`),
      close: () => $(`//div[@class='section-trivia-Q']//img`)
    },
    misc: {
      recentActivity: () => $(`//h2[contains(text(),'Recent activity')]/ancestor::section//h3[@class='mb-0 date-text-dotted']`),
      recentLabel: () => $(`//h2[contains(text(),'Recent activity')]`),
      helpButton: () => $(`//div[@class='help-button']`),
      learnMore: () => $(`//button[contains(text(),'Learn More')]`),
      learnMoreMsg: () => $(`//h4[@class='entry-work fw-bold']`),
      learnMoreClose: () => $(`//button[@class='sweepStakesModalBtn']`),
      termsService: () => $(`//span[contains(text(),'Terms of Service')]`),
      termsLabel: () => $(`//div[@id='app']//h2`),
      backButton: () => $(`//div[@class='icon-image-back']`)
    }
  }

  /**
   * Selects date from date picker
   */
  dateSelectDatePicker(date) {
    return $(`(//div[@class='react-datepicker__week']/div[text()='${date}'])[1]`);
  }

  /**
   * Selects date from previous month
   */
  previousMonthDateSelectDatePicker(date) {
    return $(`//div[@class='react-datepicker__week react-datepicker__week--keyboard-selected']/div[text()='${date}']`);
  }

  /**
   * Handles sweepstakes entries
   */
  async sweepstakesEntries() {
    await browser.pause(4000);
    const walletEntries = await this.selectors.wallet.entry().getText();
    await Assertions.assertElementText(this.selectors.wallet.entry(), sweepstakesDataFeed.assertData.WalletHeaderEntryVal);

    await Assertions.assertElementIsVisible(this.selectors.actions.entries(1));
    await UIActions.clickElement(this.selectors.actions.entries(1));

    await browser.pause(4000);
    this.entryHeader_ActionsPage = await this.selectors.task.entryHeader().getText();
    this.entryVal_ActionsPage = await this.selectors.task.entryValue().getText();

    await Assertions.assertElementIsVisible(this.selectors.actions.scheduleToday());
    await UIActions.clickElement(this.selectors.actions.scheduleToday());

    await this.handleWindowSwitch();
  }

  /**
   * Handles window switching
   */
  async handleWindowSwitch() {
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
    }
  }

  /**
   * Selects entry from pending actions
   */
  async selectEnrtyFromPendingActions() {
    await browser.pause(5000);
    await UIActions.scrollToElement(this.selectors.pending.entries(1));
    await browser.pause(3000);
    await UIActions.clickElement(this.selectors.pending.entries(1));
  }

  /**
   * Validates entry values in pending actions
   */
  async validatingEntryValuesInPendingActions() {
    await browser.pause(1000);
    const entryVal = await this.selectors.task.entryValue().getText();
    const entryHeaderVal = await this.selectors.task.entryHeader().getText();
    const entryStatusVal = await this.selectors.task.statusPending().getText();

    assert.equal(this.entryHeader_ActionsPage, entryHeaderVal);
    assert.equal(sweepstakesDataFeed.assertData.EntryPendingStatus, entryStatusVal);

    await UIActions.clickElement(this.selectors.misc.termsService());
    await UIActions.waitForElementDisplayed(this.selectors.misc.termsLabel(), 5000);
    const headerVal = await this.selectors.misc.termsLabel().getText();
    await UIActions.clickElement(this.selectors.misc.backButton());

    assert.equal(headerVal, sweepstakesDataFeed.assertData.TermsAndServiceLabelVal);
  }

  /**
   * Completes task in sweepstakes
   */
  async completeTaskInSweepstakes() {
    await browser.pause(3000);
    await UIActions.waitForElementDisplayed(this.selectors.task.completeCheckbox(), 5000);
    await UIActions.clickElement(this.selectors.task.completeCheckbox());

    await UIActions.waitForElementDisplayed(this.selectors.task.alertCheckbox(), 5000);
    await UIActions.clickElement(this.selectors.task.alertCheckbox());

    const conformationMsg = await this.selectors.task.completionText().getText();
    assert.equal(sweepstakesDataFeed.assertData.ConformationText, conformationMsg);

    await this.handleDateSelection();
    await this.verifyCompletionStatus();
  }

  /**
   * Handles date selection
   */
  async handleDateSelection() {
    await UIActions.clickElement(this.selectors.task.dateInput());
    const today = new Date();
    const todayDate = parseInt(today.getDate(), 10);

    await browser.pause(1000);
    await UIActions.clickElement(this.dateSelectDatePicker(todayDate));
    await browser.pause(1000);
    await UIActions.clickElement(this.selectors.task.markComplete());
  }

  /**
   * Verifies completion status
   */
  async verifyCompletionStatus() {
    await browser.pause(8000);
    await UIActions.scrollToElement(this.selectors.misc.recentActivity());
    await UIActions.clickElement(this.selectors.misc.recentActivity());

    const entryCompleteStatus = await this.selectors.task.statusCompleted().getText();
    const doneLabelVal = await this.selectors.task.doneToggle().getText();

    assert.equal(sweepstakesDataFeed.assertData.EntryCompleteStatus, entryCompleteStatus);
    assert.equal(sweepstakesDataFeed.assertData.DoneLabelText, doneLabelVal);
  }

  /**
       * Validates show more actions functionality
       */
  async showMoreActionsPage() {
    await UIActions.scrollToElement(this.selectors.actions.showMore());
    await UIActions.clickElement(this.selectors.actions.showMore());
  }

  /**
  * Validates pending action messages
  */
  async validatingPendingActionMsg() {
    await UIActions.clickElement(this.selectors.pending.section());
    await UIActions.clickElement(this.selectors.pending.crossImage());

    await Assertions.assertElementIsVisible(this.selectors.pending.viewActions());

    const pendingActionMessageVal = await this.selectors.pending.message().getText();
    assert.equal(pendingActionMessageVal, sweepstakesDataFeed.assertData.NoPendingActionsMessage);
  }

  /**
  * Validates complete action messages
  */
  async validatingCompleteActionMsg() {
    await UIActions.clickElement(this.selectors.completed.section());
    await Assertions.assertElementIsVisible(this.selectors.completed.viewActions());

    const completedActionMessageVal = await this.selectors.completed.message().getText();
    assert.equal(completedActionMessageVal, sweepstakesDataFeed.assertData.NoCompletedActionsMessage);
  }

  /**
  * Validates help button functionality
  */
  async validateHelpBtn() {
    await UIActions.waitForElementDisplayed(this.selectors.misc.helpButton(), 5000);
    await Assertions.assertElementIsVisible(this.selectors.misc.helpButton());
  }

  /**
  * Validates learn more button functionality
  */
  async validateLearnMoreBtn() {
    await UIActions.waitForElementDisplayed(this.selectors.misc.learnMore(), 5000);
    await Assertions.assertElementIsVisible(this.selectors.misc.learnMore());

    await UIActions.clickElement(this.selectors.misc.learnMore());
    const msgTxt = await this.selectors.misc.learnMoreMsg().getText();
    assert.equal(msgTxt, sweepstakesDataFeed.assertData.learnMoreBtnMsgTxt);

    await UIActions.clickElement(this.selectors.misc.learnMoreClose());
  }

  /**
  * Validates start earning entries label
  */
  async validatStartEarningEntriesLabel() {
    const walletEntries = await this.selectors.wallet.entry().getText();
    await Assertions.assertElementText(this.selectors.wallet.entry(), sweepstakesDataFeed.assertData.WalletHeaderEntryVal);
  }

  /**
  * Validates pending actions on landing page
  */
  async validatePendingActionsLandingPg() {
    await Assertions.assertElementIsNotVisible(this.selectors.pending.label());
  }

  /**
  * Validates recent activities on landing page
  */
  async validateRecentActivitiesLandingPg() {
    await Assertions.assertElementIsNotVisible(this.selectors.misc.recentLabel());
  }

  /**
  * Validates date range of a task
  */
  async validateDateRangeOfATask() {
    await UIActions.waitForElementDisplayed(this.selectors.task.completeCheckbox(), 5000);
    await UIActions.clickElement(this.selectors.task.completeCheckbox());

    await UIActions.waitForElementDisplayed(this.selectors.task.alertCheckbox(), 5000);
    await UIActions.clickElement(this.selectors.task.alertCheckbox());

    await UIActions.clickElement(this.selectors.task.dateInput());

    const today = new Date();
    const todayDate = parseInt(today.getDate(), 10) + 1;

    await UIActions.clickElement(this.selectors.task.datePrevMonth());
    await Assertions.assertElementIsNotVisible(this.selectors.task.datePrevMonth());

    await UIActions.clickElement(this.selectors.task.dateNextMonth());
    await Assertions.assertElementIsNotVisible(this.selectors.task.dateNextMonth());

    await UIActions.clickElement(this.selectors.task.datePrevMonth());
    await UIActions.clickElement(this.dateSelectDatePicker(todayDate));
    await UIActions.clickElement(this.selectors.task.markComplete());

    await UIActions.scrollToElement(this.selectors.misc.recentActivity());
    await UIActions.clickElement(this.selectors.misc.recentActivity());

    const entryCompleteStatus = await this.selectors.task.statusCompleted().getText();
    assert.equal(sweepstakesDataFeed.assertData.EntryCompleteStatus, entryCompleteStatus);

    const doneLabelVal = await this.selectors.task.doneToggle().getText();
    assert.equal(sweepstakesDataFeed.assertData.DoneLabelText, doneLabelVal);
  }

  /**
  * Selects all sweepstakes entries
  */
  async selectAllSweepsteaksEnties() {
    const walletEntries = await this.selectors.wallet.entry().getText();
    assert.equal(walletEntries, sweepstakesDataFeed.assertData.WalletHeaderEntryVal);

    for (let i = 0; i < 40; i++) {
      if (await this.selectors.actions.entries(1).isDisplayed()) {
        const entryVal = await this.selectors.actions.entriesHeader().getText();

        await UIActions.clickElement(this.selectors.actions.entries(1));

        entryHeader_ActionsPage = await this.selectors.task.entryHeader().getText();
        entryVal_ActionsPage = await this.selectors.task.entryValue().getText();

        await Assertions.assertElementIsVisible(this.selectors.actions.enrollButton());
        await UIActions.clickElement(this.selectors.actions.enrollButton());

        await this.handleWindowSwitch();
      } else {
        break;
      }
    }

    const successMsgText = await this.selectors.actions.successMessage().getText();
    assert.equal(successMsgText, sweepstakesDataFeed.assertData.SuccessMsgInActionForYou);
  }
}



module.exports = new SweepstakesPage();