const { assert, expect } = require("chai");
const UIActions = require('../../../utils/UIActions');
const Assertions = require('../../../utils/Assertions');
const assertdatas = require("..//..//../data/rewardsData.json");
const ApiAssertQues = require(`../../../data/QuestionAssert.json`);

class TriviaTask {
    // Organized selectors by functionality
    selectors = {
        navigation: {
            ftue: () => $(`//button[text()='Get Started']`),
            triviaClose: () => $(`//div[@class="text-end"]/img`),
            backBtn: () => $(`//div[@class='modal-title h4']`),
            backButtonActionsPage: () => $(`//div[@class='task-svg-wrapper']`),
            actionsPageBackButton: () => $(`//div[@class='icon-image-back set-back']`),
            closeIcon: () => $(`//div[@class='cross-img']`)
        },
        trivia: {
            actionsForYou: () => $(`//h5[text()='Play Monthly Trivia']`),
            playNow: () => $(`//button[text()='Play Now!']`),
            question: () => $(`//div[@class='first-section-trivia-qns']//div/h4`),
            options: (i) => $(`(//button[@class='text-center false'])[${i}]`),
            doneButton: () => $(`//button[text()='Done']`),
            answerlabel: () => $(`(//div[@class='question-mark-image mb-16']//following::p)[1]`),
            nextButton: () => $(`//button[text()='Next question']`)
        },
        tasks: {
            tasksList: (options) => $(`//h2[contains(text(),'Actions for you')]/parent::div/following-sibling::div[${options}]`),
            taskButton: () => $(`//div[@class='task-action']/button`),
            showMoreActions: () => $(`//p[contains(text(),'Show more actions')]`),
            pendingActionSection: () => $(`//button[text()='Pending']`),
            completeButtonToggle: () => $(`//input[contains(@class,'form-check-input border-0 shadow-none')]`),
            taskAlertCheckbox: () => $(`//div[@class='alertContent']/input[@id='myButton']`),
            completionDateInput: () => $(`//input[@id='date-picker']`),
            markCompleteBtn: () => $(`//button[contains(text(),'Mark Complete')]`)
        },
        wallet: {
            walletbalanceAmount: () => $(`//div[@class='side-left']//h2`),
            maxWalletLimit: () => $(`//div[@class='space-exit ']//h4`),
            walletWithoutBalance: () => $(`//section[@class='zero-wrapper mx-1']`),
            redeemButton: () => $(`//button[text()='Redeem']`)
        }
    }

    /**
     * Handles trivia questions flow
     */
    async triviaQuestions() {
        for (let i = 1; i < 5; i++) {
            await this.selectOptions(i);
            if (i === 4) break;
            
            await UIActions.clickElement(this.selectors.trivia.nextButton());
        }
        await UIActions.clickElement(this.selectors.trivia.doneButton());
    }

    /**
     * Selects options in trivia
     */
    async selectOptions(i) {
        const questionElement = this.selectors.trivia.question();
        await Assertions.assertElementText(questionElement, ApiAssertQues[`question_${i - 1}`]);

        // Validate options
        for (let j = 1; j < 3; j++) {
            const optionElement = this.selectors.trivia.options(j);
            const expectedOptionVal = ApiAssertQues[`options_${i - 1}`][j - 1];
            await Assertions.assertElementText(optionElement, expectedOptionVal);
        }

        // Select correct answer
        const optVal = parseInt(ApiAssertQues[`answer_${i - 1}`]);
        const selector1 = optVal + 1;
        
        await UIActions.clickElement(this.selectors.trivia.options(selector1));
        await Assertions.assertElementText(this.selectors.trivia.answerlabel(), "CORRECT");
    }

    /**
     * Performs task actions
     */
    async taskActions(tasklength) {
        for (let j = 2; j < tasklength; j++) {
            await UIActions.scrollToElement(this.selectors.tasks.tasksList(2));
            
            if (await this.selectors.trivia.spinwheelTask().isDisplayed()) {
                console.log("Skipping task due to spinwheel");
                continue;
            }

            await UIActions.clickElement(this.selectors.tasks.tasksList(2));
            await UIActions.clickElement(this.selectors.tasks.taskButton());
            
            // Handle new tab
            const currentWindowHandle = await browser.getWindowHandle();
            const allWindowHandles = await browser.getWindowHandles();
            const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
            
            if (currentIndex < allWindowHandles.length - 1) {
                await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
                await browser.closeWindow();
                await browser.switchToWindow(currentWindowHandle);
            }
        }
    }

    /**
     * Validates redemption balance
     */
    async validateRedemptionBalance() {
      let j = 1;
      const availableBalance = await this.selectors.wallet.walletbalanceAmount().getText();
      console.log("availablebalance+++++++++", availableBalance);
      
      await UIActions.scrollToElement(this.selectors.wallet.redeemButton());
      await Assertions.assertElementIsVisible(this.selectors.wallet.redeemButton());
      await UIActions.clickElement(this.selectors.wallet.redeemButton());
      
      const iframe = await $("iframe");
      await browser.switchToFrame(iframe);
      
      await Assertions.assertElementIsVisible(this.selectors.navigation.closeIcon());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeoutLogo());
      
      await UIActions.scrollToElement(this.selectors.wallet.getCopyRight());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getCopyRight());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeOutTerms());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getPrivacyPolicy());
      
      await UIActions.scrollToElement(this.selectors.wallet.getAvialableBalance());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getAvialableBalance());
      
      const balance = await this.selectors.wallet.getAvialableBalance().getText();
      const prizeoutBalance = balance.split(".")[0];
      expect(availableBalance).to.equal(prizeoutBalance);
      
      const count = await this.selectors.wallet.getGiftCardCounts().length;
      for (let i = 1; i <= count; i++) {
          await Assertions.assertElementIsVisible(this.selectors.wallet.getGiftCard(i));
      }
      
      await UIActions.clickElement(this.selectors.wallet.redemGiftCard());
      await Assertions.assertElementIsVisible(this.selectors.wallet.activeGiftCardPanel());
      
      const amountOptions = await this.selectors.wallet.activeGiftCardPanelAmountCount().length;
      while (j <= amountOptions) {
          const amount = await this.selectors.wallet.activeGiftCardPanelAmount(j).getText();
          const activeAccount = parseFloat(amount.replace("$", ""));
          
          const spendAmount = await this.selectors.wallet.getSpendAmount().getText();
          const activeSpendAccount = parseFloat(spendAmount.replace("$", ""));
          expect(activeAccount).to.equal(activeSpendAccount);
          
          if (await this.selectors.wallet.getPrizeDiscount().isDisplayed()) {
              const discountPrice = await this.selectors.wallet.getprizeBonusAmount().getText();
              const activeDiscountAccount = parseFloat(discountPrice.replace("$", ""));
              
              const totalAmountYouGet = await this.selectors.wallet.getTotalAmountYouGet().getText();
              const activeTotalAmountYouGet = parseFloat(totalAmountYouGet.replace("$", ""));
              const totalAmount = parseFloat(activeSpendAccount + activeDiscountAccount);
              expect(activeTotalAmountYouGet).to.equal(totalAmount);
          } else {
              const totalAmountYouGet = await this.selectors.wallet.getTotalAmountYouGet().getText();
              const activeTotalAmountYouGet = parseFloat(totalAmountYouGet.replace("$", ""));
              expect(activeSpendAccount).to.equal(activeTotalAmountYouGet);
          }
          
          j++;
          if (await this.selectors.wallet.activeGiftCardPanelAmount(j).isDisplayed()) {
              await UIActions.clickElement(this.selectors.wallet.activeGiftCardPanelAmount(j));
          } else {
              await UIActions.clickElement(this.selectors.wallet.getCloseButton());
              break;
          }
      }
  }

  /**
   * Validates select gift card functionality
   */
  async validateSelectGiftCard() {
      await UIActions.clickElement(this.selectors.wallet.redemGiftCard());
      await UIActions.clickElement(this.selectors.wallet.getSelectGiftCard());
      await UIActions.clickElement(this.selectors.wallet.getConfirmButton());
      
      await Assertions.assertElementIsVisible(this.selectors.wallet.getConfirmingGiftCard());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getOrderConfirmed());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getCoinBase());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getCheckoutConfirmation());
      await Assertions.assertElementIsVisible(this.selectors.wallet.getViewGiftCard());
  }

  /**
   * Shows more actions
   */
  async showMoreAction() {
      await UIActions.scrollToElement(this.selectors.tasks.showMoreActions());
      await UIActions.clickElement(this.selectors.tasks.showMoreActions());
      await UIActions.clickElement(this.selectors.tasks.pendingActionSection());
      await UIActions.clickElement(this.selectors.navigation.closeIcon());
  }

  /**
   * Validates the send button icon
   */
  async validateSendButtonIcon() {
      await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
      await UIActions.clickElement(this.selectors.tasks.getSendButton());
      
      await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
      await UIActions.clickElement(this.selectors.tasks.getExitButton());
      
      await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
      await UIActions.clickElement(this.selectors.tasks.getCancelButton());
      await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
  }

  /**
     * Validates redemption balance and gift card functionality
     */
  async validateRedemptionBalance() {
    let j = 1;
    const availableBalance = await this.selectors.wallet.walletbalanceAmount().getText();
    console.log("availablebalance+++++++++", availableBalance);
    
    await UIActions.scrollToElement(this.selectors.wallet.redeemButton());
    await Assertions.assertElementIsVisible(this.selectors.wallet.redeemButton());
    await UIActions.clickElement(this.selectors.wallet.redeemButton());
    
    const iframe = await $("iframe");
    await browser.switchToFrame(iframe);
    
    await Assertions.assertElementIsVisible(this.selectors.navigation.closeIcon());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeoutLogo());
    
    await UIActions.scrollToElement(this.selectors.wallet.getCopyRight());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getCopyRight());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeOutTerms());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getPrivacyPolicy());
    
    await UIActions.scrollToElement(this.selectors.wallet.getAvialableBalance());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getAvialableBalance());
    
    const balance = await this.selectors.wallet.getAvialableBalance().getText();
    const prizeoutBalance = balance.split(".")[0];
    expect(availableBalance).to.equal(prizeoutBalance);
    
    const count = await this.selectors.wallet.getGiftCardCounts().length;
    for (let i = 1; i <= count; i++) {
        await Assertions.assertElementIsVisible(this.selectors.wallet.getGiftCard(i));
    }
    
    await UIActions.clickElement(this.selectors.wallet.redemGiftCard());
    await Assertions.assertElementIsVisible(this.selectors.wallet.activeGiftCardPanel());
    
    const amountOptions = await this.selectors.wallet.activeGiftCardPanelAmountCount().length;
    while (j <= amountOptions) {
        const amount = await this.selectors.wallet.activeGiftCardPanelAmount(j).getText();
        const activeAccount = parseFloat(amount.replace("$", ""));
        
        const spendAmount = await this.selectors.wallet.getSpendAmount().getText();
        const activeSpendAccount = parseFloat(spendAmount.replace("$", ""));
        expect(activeAccount).to.equal(activeSpendAccount);
        
        if (await this.selectors.wallet.getPrizeDiscount().isDisplayed()) {
            const discountPrice = await this.selectors.wallet.getprizeBonusAmount().getText();
            const activeDiscountAccount = parseFloat(discountPrice.replace("$", ""));
            
            const totalAmountYouGet = await this.selectors.wallet.getTotalAmountYouGet().getText();
            const activeTotalAmountYouGet = parseFloat(totalAmountYouGet.replace("$", ""));
            const totalAmount = parseFloat(activeSpendAccount + activeDiscountAccount);
            expect(activeTotalAmountYouGet).to.equal(totalAmount);
        } else {
            const totalAmountYouGet = await this.selectors.wallet.getTotalAmountYouGet().getText();
            const activeTotalAmountYouGet = parseFloat(totalAmountYouGet.replace("$", ""));
            expect(activeSpendAccount).to.equal(activeTotalAmountYouGet);
        }
        
        j++;
        if (await this.selectors.wallet.activeGiftCardPanelAmount(j).isDisplayed()) {
            await UIActions.clickElement(this.selectors.wallet.activeGiftCardPanelAmount(j));
        } else {
            await UIActions.clickElement(this.selectors.wallet.getCloseButton());
            break;
        }
    }
}

/**
 * Validates gift card selection process
 */
async validateSelectGiftCard() {
    await UIActions.clickElement(this.selectors.wallet.redemGiftCard());
    await UIActions.clickElement(this.selectors.wallet.getSelectGiftCard());
    await UIActions.clickElement(this.selectors.wallet.getConfirmButton());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getConfirmingGiftCard());
    
    await Assertions.assertElementIsVisible(this.selectors.wallet.getOrderConfirmed());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getCoinBase());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getCheckoutConfirmation());
    await Assertions.assertElementIsVisible(this.selectors.wallet.getViewGiftCard());
}

/**
 * Validates the send button functionality
 */
async validateSendButtonIcon() {
    await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
    await UIActions.clickElement(this.selectors.tasks.getSendButton());
    
    await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
    await UIActions.clickElement(this.selectors.tasks.getExitButton());
    
    await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
    await UIActions.clickElement(this.selectors.tasks.getCancelButton());
    await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
}

/**
 * Validates transaction history
 */
async verifyTransactionHistory() {
    let total = 0;
    const length = await this.selectors.wallet.count().length;
    
    for (let i = 1; i <= length; i++) {
        const activities = await this.selectors.wallet.recentActivities(i).getText();
        const cleanedText = activities.replace(/[^\d.-]/g, "").trim();
        const parsedValue = parseFloat(cleanedText);
        
        if (!isNaN(parsedValue)) {
            total += parsedValue;
        }
    }
    return total;
}

/**
     * Validates send button functionality
     */
async validateSendButtonIcon() {
  await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
  await UIActions.clickElement(this.selectors.tasks.getSendButton());
  
  await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
  await UIActions.clickElement(this.selectors.tasks.getExitButton());
  
  await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
  await UIActions.clickElement(this.selectors.tasks.getCancelButton());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
}

/**
* Completes tasks until reaching maximum limit
*/
async completeTasks() {
  let i = 20;
  await UIActions.scrollToElement(this.selectors.tasks.getShowMoreActions());
  await UIActions.clickElement(this.selectors.tasks.getShowMoreActions());

  while (true) {
      const count = await this.selectors.tasks.getTasksCount().length;
      if (count > i) {
          await UIActions.scrollToElement(this.selectors.tasks.getTasks(i));
          await UIActions.clickElement(this.selectors.tasks.getTasks(i));
          await UIActions.clickElement(this.selectors.tasks.actionOnTasks());
          await UIActions.scrollToElement(this.selectors.tasks.actionOnGobackButton());
          await UIActions.clickElement(this.selectors.tasks.actionOnGobackButton());

          const text = await this.selectors.tasks.getLimit().getText();
          const limit = text.replace(/[$\s]/g, "");
          if (limit === "0") break;

          await UIActions.scrollToElement(this.selectors.tasks.getShowMoreActions());
          await UIActions.clickElement(this.selectors.tasks.getShowMoreActions());
      } else {
          break;
      }
  }
}

/**
* Verifies status of recent activities
*/
async verifyStatusOfRecentActivities() {
  await UIActions.scrollToElement(this.selectors.tasks.getRecentActivitiesSection());
  
  const count = await this.selectors.tasks.getRecentActivitiesLength().length;
  for (let i = 1; i <= count; i++) {
      await UIActions.scrollToElement(this.selectors.tasks.getStatusOfCompleted(i));
      const status = await this.selectors.tasks.getStatusOfCompleted(i).getText();
      await UIActions.scrollToElement(this.selectors.tasks.activityLabel(i));
      const activityLabelText = await this.selectors.tasks.activityLabel(i).getText();
      
      if (!activityLabelText.includes("Gift Card")) {
          expect(status).to.equal("Completed");
          await UIActions.clickElement(this.selectors.tasks.getStatusOfCompleted(i));
          
          if (await this.selectors.tasks.getStatusModalBox().isDisplayed()) {
              const status = await this.selectors.tasks.getStatusOfDone().getText();
              expect(status).to.equal("Done");
              await UIActions.clickElement(this.selectors.tasks.actionOnBackButton());
          }
      }
  }
}

/**
* Validates redemption balance and gift card functionality
*/
async validateRedemptionBalance() {
  let j = 1;
  const availableBalance = await this.selectors.wallet.walletbalanceAmount().getText();
  
  await UIActions.scrollToElement(this.selectors.wallet.redeemButton());
  await Assertions.assertElementIsVisible(this.selectors.wallet.redeemButton());
  await UIActions.clickElement(this.selectors.wallet.redeemButton());
  
  const iframe = await $("iframe");
  await browser.switchToFrame(iframe);
  
  await this.validatePrizeoutInterface();
  await this.validateGiftCardOptions(j, availableBalance);
}

/**
* Validates Prizeout interface elements
*/
async validatePrizeoutInterface() {
  await Assertions.assertElementIsVisible(this.selectors.navigation.closeIcon());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeoutLogo());
  
  await UIActions.scrollToElement(this.selectors.wallet.getCopyRight());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getCopyRight());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getPrizeOutTerms());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getPrivacyPolicy());
}

/**
* Validates gift card selection process
*/
async validateSelectGiftCard() {
  await UIActions.clickElement(this.selectors.wallet.redemGiftCard());
  await UIActions.clickElement(this.selectors.wallet.getSelectGiftCard());
  await UIActions.clickElement(this.selectors.wallet.getConfirmButton());
  
  await Assertions.assertElementIsVisible(this.selectors.wallet.getConfirmingGiftCard());
  
  await Assertions.assertElementIsVisible(this.selectors.wallet.getOrderConfirmed());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getCoinBase());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getCheckoutConfirmation());
  await Assertions.assertElementIsVisible(this.selectors.wallet.getViewGiftCard());
}

/**
* Shows more actions and navigates to pending section
*/
async showMoreAction() {
  await UIActions.scrollToElement(this.selectors.tasks.showMoreActions());
  await UIActions.clickElement(this.selectors.tasks.showMoreActions());
  await UIActions.clickElement(this.selectors.tasks.pendingActionSection());
  await UIActions.clickElement(this.selectors.navigation.closeIcon());
}

/**
* Gets transaction history total
*/
async getTransactionHistory() {
  let total = 0;
  const length = await this.selectors.wallet.count().length;
  
  for (let i = 1; i <= length; i++) {
      const activities = await this.selectors.wallet.recentActivities(i).getText();
      const cleanedText = activities.replace(/[^\d.-]/g, "").trim();
      const parsedValue = parseFloat(cleanedText);
      
      if (!isNaN(parsedValue)) {
          total += parsedValue;
      }
  }
  return total;
}

/**
     * Verifies and completes pending actions
     */
async verifyAndCompletePendingActions() {
  const currentDate = new Date().getDate();
  let i = 1;
  
  while (true) {
      await UIActions.scrollToElement(this.selectors.tasks.pendingActionsectionLabel());
      
      const count = await this.selectors.tasks.pendingActionTaskCount().length;
      console.log("count:", count);
      
      if (count > i) {
          await UIActions.scrollToElement(this.selectors.tasks.getPendingActions(i));
          await UIActions.clickElement(this.selectors.tasks.getPendingActions(i));
          
          await Assertions.assertElementIsVisible(this.selectors.tasks.getStatusModalBox());
          await UIActions.clickElement(this.selectors.tasks.actionOnCompleteCheckbox());
          await Assertions.assertElementIsVisible(this.selectors.tasks.getMarkCompletePopUp());
          
          await UIActions.clickElement(this.selectors.tasks.actionOnCheckbox());
          await UIActions.clickElement(this.selectors.tasks.selectDate());
          await UIActions.clickElement(this.selectors.tasks.selectCurrentDate(currentDate));
          await UIActions.clickElement(this.selectors.tasks.markCompleteBtn());
      } else {
          break;
      }
  }
}

/**
* Verifies top rated gift card section
*/
async verifyTopRatedGiftCard() {
  await UIActions.scrollToElement(this.selectors.tasks.getTopRatedPrizeLabel());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getTopRatedPrizeLabel());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getprizeImage());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getprizeName());
  
  await UIActions.scrollToElement(this.selectors.tasks.getLearnMoreBtn());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getLearnMoreBtn());
  await UIActions.clickElement(this.selectors.tasks.getLearnMoreBtn());
  
  await Assertions.assertElementIsVisible(this.selectors.tasks.getLearnMorePopUp());
  await UIActions.clickElement(this.selectors.tasks.actionOnCancelIcon());
  
  await UIActions.scrollToElement(this.selectors.tasks.getTask());
  await UIActions.clickElement(this.selectors.tasks.getTask());
  await UIActions.clickElement(this.selectors.tasks.actionOnTasks());
}

/**
* Validates congratulation message
*/
async validateCongratulationMessage() {
  const message = await this.selectors.tasks.getCongratulationLabel().getText();
  expect(message).to.equal("Congratulations, you've started all available actions!");
}

/**
* Gets available spents amount
*/
async getAvailableSpents() {
  await UIActions.scrollToElement(this.selectors.wallet.availableSpents());
  const availableSpents = await this.selectors.wallet.availableSpents().getText();
  const cleanedText = availableSpents.replace(/[^\d.-]/g, "").trim();
  return parseFloat(cleanedText);
}

/**
* Shows all transactions
*/
async actionOnShowAllTransactions() {
  await UIActions.scrollToElement(this.selectors.wallet.showAllTransactions());
  await UIActions.clickElement(this.selectors.wallet.showAllTransactions());
}

/**
* Verifies status of all transactions
*/
async verifyStatusOfAllTransactions() {
  const count = await this.selectors.wallet.getRecentActivitiesLength().length;
  for (let i = 1; i <= count; i++) {
      const status = await this.selectors.wallet.getStatusOfCompleted(i).getText();
      expect(status).to.equal("Completed");
  }
}

/**
* Verifies transaction months
*/
async verifyTransactionMonths() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex];

  if (await this.selectors.wallet.getThisMonth().isDisplayed()) {
      const displayedMonthText = await this.selectors.wallet.getDate().getText();
      const extractedMonth = displayedMonthText.replace(/[^a-zA-Z]/g, "");
      expect(extractedMonth).to.equal(currentMonth);
  }

  if (await this.selectors.wallet.previousMonth().isDisplayed()) {
      const previousMonthsCount = await this.selectors.wallet.previousMonthCount().length;
      for (let i = 1; i <= previousMonthsCount; i++) {
          const previousMonthText = await this.selectors.wallet.previousMonths(i).getText();
          const extractedPreviousMonth = previousMonthText.replace(/[^a-zA-Z]/g, "");
          expect(extractedPreviousMonth).not.to.equal(currentMonth);
      }
  }
}

/**
* Validates send button functionality
*/
async validateSendButtonIcon() {
  await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
  await UIActions.clickElement(this.selectors.tasks.getSendButton());
  
  await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
  await UIActions.clickElement(this.selectors.tasks.getExitButton());
  
  await Assertions.assertElementIsVisible(this.selectors.tasks.getExitModalBox());
  await UIActions.clickElement(this.selectors.tasks.getCancelButton());
  await Assertions.assertElementIsVisible(this.selectors.tasks.getSendButton());
}

/**
     * Validates wallet balance and updates state
     */
async balanceAmount() {
  await UIActions.scrollToElement(this.selectors.wallet.walletbalanceAmount());
  this.initialBalance = await this.selectors.wallet.walletbalanceAmount().getText();
  console.log(`Initial Balance: ${this.initialBalance}`);
}

/**
* Updates and validates new balance
*/
async updatedBalance() {
  const updatedBalances = await this.selectors.wallet.walletbalanceAmount().getText();
  const cleanUpdatedBalance = updatedBalances.replace(/\$/g, "");
  const updatedBalancesNum = parseInt(cleanUpdatedBalance, 10);
  
  const cleanInitialBalance = this.initialBalance.replace(/\$/g, "");
  const initialBalanceNum = parseInt(cleanInitialBalance, 10);
  
  console.log("The Initial Balance is:", initialBalanceNum);
  assert.isTrue(updatedBalancesNum > initialBalanceNum);
  expect(updatedBalancesNum).to.be.greaterThan(initialBalanceNum);
  console.log("The updated balance is:", updatedBalancesNum);
}

/**
* Checks maximum wallet balance limit
*/
async maxWalletBalanceLimit() {
  const maxLimit = await this.selectors.wallet.maxWalletLimit().getText();
  const cleanMaxLimit = maxLimit.replace(/\$/g, "");
  const maxLimitNum = parseInt(cleanMaxLimit, 10);
  
  if (this.updatedBalancesNum >= maxLimitNum) {
      console.log("Wallet has reached the maximum limit. Stopping further operations.");
  } else {
      console.log("Wallet has not reached the maximum limit. Proceeding with operations.");
  }
}

/**
* Validates all pending actions
*/
async allPendingActions() {
  const noPendingLabel = await this.selectors.tasks.nopendinghActionslabel().getText();
  console.log("Actual result:", noPendingLabel);
  console.log("Expected result:", assertdatas.assertData.NopendingActionsVal);
  assert.equal(noPendingLabel, assertdatas.assertData.NopendingActionsVal);
}

/**
* Validates pending actions list
*/
async pendingActionslist() {
  await UIActions.scrollToElement(this.selectors.tasks.pendingActionsectionLabel());
  const pendingList = await this.selectors.tasks.pendingActionTaskCount().length;
  console.log("Tasks count:", pendingList);
  expect(pendingList).to.equal(3);
}

/**
* Validates redemption button state
*/
async redemptionButtonIn() {
  await Assertions.assertElementIsVisible(this.selectors.wallet.walletWithoutBalance());
  await Assertions.assertElementIsNotVisible(this.selectors.wallet.redeemButton());
}

/**
* Gets available spents amount
*/
async getAvailableSpents() {
  await UIActions.scrollToElement(this.selectors.wallet.availableSpents());
  const availableSpents = await this.selectors.wallet.availableSpents().getText();
  const cleanedText = availableSpents.replace(/[^\d.-]/g, "").trim();
  return parseFloat(cleanedText);
}

/**
* Shows all transactions
*/
async actionOnShowAllTransactions() {
  await UIActions.scrollToElement(this.selectors.wallet.showAllTransactions());
  await UIActions.clickElement(this.selectors.wallet.showAllTransactions());
}

/**
* Verifies status of all transactions
*/
async verifyStatusOfAllTransactions() {
  const count = await this.selectors.wallet.getRecentActivitiesLength().length;
  for (let i = 1; i <= count; i++) {
      const status = await this.selectors.wallet.getStatusOfCompleted(i).getText();
      expect(status).to.equal("Completed");
  }
}

/**
* Gets transaction history total
*/
async getTransactionHistory() {
  let total = 0;
  const length = await this.selectors.wallet.count().length;
  
  for (let i = 1; i <= length; i++) {
      const activities = await this.selectors.wallet.recentActivities(i).getText();
      const cleanedText = activities.replace(/[^\d.-]/g, "").trim();
      const parsedValue = parseFloat(cleanedText);
      
      if (!isNaN(parsedValue)) {
          total += parsedValue;
      }
  }
  return total;
}

/**
* Handles window switching
*/
async handleWindowSwitch() {
  const currentWindowHandle = await browser.getWindowHandle();
  const allWindowHandles = await browser.getWindowHandles();
  const currentIndex = allWindowHandles.indexOf(currentWindowHandle);
  
  if (currentIndex < allWindowHandles.length - 1) {
      await browser.switchToWindow(allWindowHandles[currentIndex + 1]);
      await browser.closeWindow();
      await browser.switchToWindow(currentWindowHandle);
  }
}

}

module.exports = new TriviaTask();