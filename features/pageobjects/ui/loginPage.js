//const Page = require('../../pageobjects/ui/page');
const BffApiData = require("../../../data/bffApiData.json");
const { assert } = require("chai");
const argv = require('yargs').argv;
const uiActions = require('../../../utils/UIActions');
const  Assertions  = require("../../../utils/Assertions");
// const uiActions = new UIActions();
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
  ftue() {
    return $(`//button[text()='Get Started']`);
  }
  triviaClose() {
    return $(`//img[@alt='cross_icon']`);
  }
  actionsForYou() {
    return $(`//h5[text()='Play Monthly Trivia']`);
  }
  playNow() {
    return $(`//button[text()='Play Now!']`);
  }
  tryAgainBtn() {
    return (`//button[contains(text(),'Try again')]`);
  }
  userName() {
    return $(`//input[@id='username']`)
  }
  password() {
    return $(`//input[@id='password']`)
  }
  signInBtn() {
    return $(`//button[@type='submit']`)
  }
  continue() {
    return $(`//div[text()='Continue']`)
  }

  async open(consumerCode) {
    browser.maximizeWindow();
    await browser.pause(2000);
    //onst url = argv.baseUrl+ `sdk?consumer-code=${consumerCode}`;
    //await browser.url(url);
    //console.log("!!!!!!!!!!!!!!!!!! :" + url)
    var path = `https://app.qa.sunnyrewards.com/sdk?consumer-code=${consumerCode}`;
    browser.url(path);
    await browser.pause(5000);
  }

  async syncIssue() {
    try {
      if (await this.tryAgainBtn().isDisplayed() == true) {
        await browser.refresh();
      }
    } catch (error) {
      console.log("syncIssue not handled with the error : " + error);
    }
  }

  async getStarted() {
    await browser.pause(2000);
    await this.ftue().click();
  }

  async triviaPopupClose() {
    await browser.pause(2000);
    await this.ftue().click();
    await browser.pause(5000);
    await this.triviaClose().click();
    await browser.pause(2000);
  }

  async selectTriviaTask() {
    await browser.pause(4000);
    await this.actionsForYou().scrollIntoView()
    await this.actionsForYou().click();
    await browser.pause(8000);
    await this.playNow().click();
    await browser.pause(10000);
  }

  async openAuthUrl_signIn(URL, UsrName, Psd) {
    browser.maximizeWindow();
    await browser.pause(4000);
    await browser.url(URL);
    await browser.pause(1000);
    await this.userName().setValue(UsrName);
    await this.password().setValue(Psd);
    await this.signInBtn().click();
    await browser.pause(10000);
  }
  async continueSignIn(URL, UsrName, Psd) {

    await uiActions.launchUrl(URL);
    await uiActions.clickElement(this.continue());
    await uiActions.sendText(this.userName(), UsrName);
    await uiActions.sendText(this.password(), Psd);
    await uiActions.clickElement(this.signInBtn());

    const dashboardUrl = "https://app.qa.sunnybenefits.com/Home";
    await Assertions.validateUrl(dashboardUrl, 60000);

    console.log("Logged in successfully");
  }
}

module.exports = new LoginPage();
