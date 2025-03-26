const { expect, assert } = require("chai");
const UIActions = require('../../../utils/UIActions');
const Assertions = require('../../../utils/Assertions');
const benefitsData = require("../../../data/UIBenefitsData.json");

class BenefitsSettingPage {
    // Organized selectors by functionality
    selectors = {
        profile: {
            nameText: (profileName) => $(`//div[text()='${profileName}']`),
            mailIdText: () => $(`//div[text()='Harry']/parent::div/div[2]`),
            nameValueText: () => $(`//div[text()='Name']/following-sibling::div`),
            emailValueText: () => $(`//div[text()='Email']/following-sibling::div`)
        },
        personal: {
            text: () => $(`//div[text()='Personal']`),
            header: () => $(`(//div[text()='Personal'])[2]`),
            nameText: () => $(`//div[text()='Name']`),
            emailText: () => $(`//div[text()='Email']`),
            backBtn: () => $(`//div[text()='Email']/parent::div/parent::div/parent::div/div[1]/div`)
        },
        notifications: {
            text: () => $(`//div[text()='Notifications']`),
            headerText: () => $(`(//div[text()='Notifications'])[2]`),
            whatReceiveHeader: () => $(`//div[text()='What notifications you receive']`),
            whereReceiveHeader: () => $(`//div[text()='Where you receive notification']`),
            rewardsHeader: () => $(`//div[text()='What notifications you receive']/parent::div//div[text()='Rewards']`),
            depositsText: () => $(`//div[text()='What notifications you receive']/parent::div//div[text()='Deposits']`),
            transactionText: () => $(`//div[text()='What notifications you receive']/parent::div//div[text()='Transactions']`),
            promotionText: () => $(`//div[text()='What notifications you receive']/parent::div//div[text()='Promotions']`),
            securityText: () => $(`//div[text()='What notifications you receive']/parent::div//div[text()='Security']`),
            pushText: () => $(`//div[text()='Push']`),
            emailText: () => $(`//div[text()='Email']`),
            smsText: () => $(`//div[text()='SMS']`),
            backBtn: () => $(`(//div[text()='Notifications']/parent::div/div[1]/div)[2]`)
        },
        devices: {
            text: () => $(`//div[text()='Devices']`),
            headerText: () => $(`(//div[text()='Devices'])[2]`),
            googleFit: () => $(`//div[text()='Google Fit']`),
            appleHealthKit: () => $(`//div[text()='Apple Health Kit']`),
            backBtn: () => $(`//div[text()='Devices']/parent::div/div[1]/div[1]/div`)
        },
        manageCard: {
            text: () => $(`//div[text()='Manage Card']`),
            headerText: () => $(`(//div[text()='Manage Card'])[2]`),
            replaceCardText: () => $(`//div[text()='Replace Card']`),
            freezeCardText: () => $(`//div[text()='Freeze Card']`),
            backBtn: () => $(`//div[text()='Manage Card']/parent::div/div[1]/div/button`)
        }
    }

    /**
     * Validates profile name
     */
    async profileNameVal() {
        const element = this.selectors.profile.nameText(benefitsData.profileNameData);
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates mail ID
     */
    async mailIdVal() {
        const element = this.selectors.profile.mailIdText();
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates personal text
     */
    async personalTextVal() {
        const element = this.selectors.personal.text();
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates personal link
     */
    async personalLinkVal() {
        await UIActions.clickElement(this.selectors.personal.text());
        const headerElement = this.selectors.personal.header();
        await UIActions.waitForElementDisplayed(headerElement, 15000);
        await browser.pause(4000);
        
        await Assertions.assertElementIsVisible(headerElement);
        await Assertions.assertElementIsVisible(this.selectors.personal.nameText());
        
        const profileName = await this.selectors.profile.nameValueText().getText();
        assert.equal(profileName, benefitsData.profileNameData);
        
        await Assertions.assertElementIsVisible(this.selectors.personal.emailText());
        const profileEmail = await this.selectors.profile.emailValueText().getText();
        assert.equal(profileEmail, benefitsData.profileEmailData);
    }

    /**
     * Navigates to settings page
     */
    async navigateToSettingsPage() {
        const backBtn = this.selectors.personal.backBtn();
        await UIActions.waitForElementDisplayed(backBtn, 15000);
        await UIActions.clickElement(backBtn);
    }

    /**
     * Validates notifications text
     */
    async notificationsTextVal() {
        const element = this.selectors.notifications.text();
        await browser.pause(4000);
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates notifications link
     */
    async notificationLinkVal() {
        await browser.pause(2000);
        await UIActions.clickElement(this.selectors.notifications.text());
        
        const headerElement = this.selectors.notifications.headerText();
        await UIActions.waitForElementDisplayed(headerElement, 15000);
        await browser.pause(4000);
        
        await Assertions.assertElementIsVisible(headerElement);
        await Assertions.assertElementIsVisible(this.selectors.notifications.whatReceiveHeader());
        await Assertions.assertElementIsVisible(this.selectors.notifications.rewardsHeader());
        await Assertions.assertElementIsVisible(this.selectors.notifications.depositsText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.transactionText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.promotionText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.securityText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.whereReceiveHeader());
        
        await UIActions.scrollToElement(this.selectors.notifications.pushText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.pushText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.emailText());
        await Assertions.assertElementIsVisible(this.selectors.notifications.smsText());
        
        await UIActions.clickElement(this.selectors.notifications.backBtn());
    }

    /**
     * Validates devices text
     */
    async devicesTextVal() {
        const element = this.selectors.devices.text();
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates devices link
     */
    async devicesLinkeVal() {
        await UIActions.clickElement(this.selectors.devices.text());
        
        const headerElement = this.selectors.devices.headerText();
        await UIActions.waitForElementDisplayed(headerElement, 15000);
        await browser.pause(4000);
        
        await Assertions.assertElementIsVisible(headerElement);
        await Assertions.assertElementIsVisible(this.selectors.devices.googleFit());
        await Assertions.assertElementIsVisible(this.selectors.devices.appleHealthKit());
        
        await UIActions.clickElement(this.selectors.devices.backBtn());
    }

    /**
     * Validates manage card text
     */
    async manageCardTextVal() {
        const element = this.selectors.manageCard.text();
        await UIActions.waitForElementDisplayed(element, 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(element);
    }

    /**
     * Validates manage card link
     */
    async manageCardLinkeVal() {
        await UIActions.clickElement(this.selectors.manageCard.text());
        
        const headerElement = this.selectors.manageCard.headerText();
        await UIActions.waitForElementDisplayed(headerElement, 15000);
        await browser.pause(4000);
        
        await Assertions.assertElementIsVisible(headerElement);
        await Assertions.assertElementIsVisible(this.selectors.manageCard.replaceCardText());
        await Assertions.assertElementIsVisible(this.selectors.manageCard.freezeCardText());
        
        await UIActions.clickElement(this.selectors.manageCard.backBtn());
        await UIActions.waitForElementDisplayed(this.selectors.manageCard.text(), 15000);
    }
}

module.exports = new BenefitsSettingPage();