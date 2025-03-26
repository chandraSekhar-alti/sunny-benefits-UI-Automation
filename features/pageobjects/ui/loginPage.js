const BffApiData = require("../../../data/bffApiData.json");
const UIActions = require('../../../utils/UIActions');
const Assertions = require("../../../utils/Assertions");

class LoginPage {
    // Organized selectors by functionality
    selectors = {
        navigation: {
            ftue: () => $(`//button[text()='Get Started']`),
            triviaClose: () => $(`//img[@alt='cross_icon']`),
            tryAgainBtn: () => $(`//button[contains(text(),'Try again')]`)
        },
        trivia: {
            actionsForYou: () => $(`//h5[text()='Play Monthly Trivia']`),
            playNow: () => $(`//button[text()='Play Now!']`)
        },
        login: {
            userName: () => $(`//input[@id='username']`),
            password: () => $(`//input[@id='password']`),
            signInBtn: () => $(`//button[@type='submit']`),
            continue: () => $(`//div[text()='Continue']`)
        }
    }

    /**
     * Opens the application with a specific consumer code
     * @param {string} consumerCode - The consumer code to use
     */
    async open(consumerCode) {
        await browser.maximizeWindow();
        const path = `https://app.qa.sunnyrewards.com/sdk?consumer-code=${consumerCode}`;
        await UIActions.launchUrl(path);
    }

    /**
     * Handles sync issues by refreshing if needed
     */
    async syncIssue() {
        try {
            const tryAgainBtn = this.selectors.navigation.tryAgainBtn();
            if (await tryAgainBtn.isDisplayed()) {
                await browser.refresh();
                await UIActions.waitForPageLoad();
            }
        } catch (error) {
            console.log("Sync issue not handled with error: ", error);
        }
    }

    /**
     * Clicks the Get Started button
     */
    async getStarted() {
        await UIActions.clickElement(this.selectors.navigation.ftue());
    }

    /**
     * Closes the trivia popup
     */
    async triviaPopupClose() {
        await UIActions.clickElement(this.selectors.navigation.ftue());
        await UIActions.clickElement(this.selectors.navigation.triviaClose());
    }

    /**
     * Selects and starts the trivia task
     */
    async selectTriviaTask() {
        const actionsForYou = this.selectors.trivia.actionsForYou();
        await UIActions.scrollToElement(actionsForYou);
        await UIActions.clickElement(actionsForYou);
        await UIActions.clickElement(this.selectors.trivia.playNow());
    }

    /**
     * Signs in using direct URL
     * @param {string} URL - The URL to navigate to
     * @param {string} UsrName - Username
     * @param {string} Psd - Password
     */
    async openAuthUrl_signIn(URL, UsrName, Psd) {
        await UIActions.launchUrl(URL);
        await UIActions.sendText(this.selectors.login.userName(), UsrName);
        await UIActions.sendText(this.selectors.login.password(), Psd);
        await UIActions.clickElement(this.selectors.login.signInBtn());
    }

    /**
     * Signs in using continue flow
     * @param {string} URL - The URL to navigate to
     * @param {string} UsrName - Username
     * @param {string} Psd - Password
     */
    async continueSignIn(URL, UsrName, Psd) {
        await UIActions.launchUrl(URL);
        await UIActions.clickElement(this.selectors.login.continue());
        await UIActions.sendText(this.selectors.login.userName(), UsrName);
        await UIActions.sendText(this.selectors.login.password(), Psd);
        await UIActions.clickElement(this.selectors.login.signInBtn());

        const dashboardUrl = "https://app.qa.sunnybenefits.com/Home";
        await Assertions.validateUrl(dashboardUrl, 60000);
    }
}

module.exports = new LoginPage();