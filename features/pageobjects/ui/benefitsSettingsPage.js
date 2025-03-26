const fs = require("fs");
const { expect , assert} = require("chai");
const benefitsData = require("../../../data/UIBenefitsData.json");

class BenefitsSettingPage{

    profileNameText(profileName){
        return $(`//div[text()='${profileName}']`);
    }
    mailIdText(){
        return $(`//div[text()='Harry']/parent::div/div[2]`);
    }
    personalText(){
        return $(`//div[text()='Personal']`);
    }
    personalHeader(){
        return $(`(//div[text()='Personal'])[2]`);
    }
    nameText(){
        return $(`//div[text()='Name']`);
    }
    nameValueText(){
        return $(`//div[text()='Name']/following-sibling::div`);
    }
    emailText(){
        return $(`//div[text()='Email']`);
    }
    emailValueText(){
        return $(`//div[text()='Email']/following-sibling::div`);
    }
    personalPageBackBtn(){
        return $(`//div[text()='Email']/parent::div/parent::div/parent::div/div[1]/div`);
    }
    notificationsText(){
        return $(`//div[text()='Notifications']`);
    }
    notificationsHeaderText(){
        return $(`(//div[text()='Notifications'])[2]`);
    }
    whatNotificationReceiveHeader(){
        return $(`//div[text()='What notifications you receive']`);
    }
    whereNotificationReceiveHeader(){
        return $(`//div[text()='Where you receive notification']`);
    }
    whatNotificationRewardsHeader(){
        return $(`//div[text()='What notifications you receive']/parent::div//div[text()='Rewards']`);
    }
    whatNotificationDepositsText(){
        return $(`//div[text()='What notifications you receive']/parent::div//div[text()='Deposits']`);
    }
    whatNotificationTransactionText(){
        return $(`//div[text()='What notifications you receive']/parent::div//div[text()='Transactions']`);
    }
    whatNotificationPromotionText(){
        return $(`//div[text()='What notifications you receive']/parent::div//div[text()='Promotions']`);
    }
    whatNotificationSecurityText(){
        return $(`//div[text()='What notifications you receive']/parent::div//div[text()='Security']`);
    }
    whereNotificationPushText(){
        return $(`//div[text()='Push']`);
    }
    whereNotificationEmailText(){
        return $(`//div[text()='Email']`);
    }
    whereNotificationSmsText(){
        return $(`//div[text()='SMS']`);
    }
    notificationsBackBtn(){
        return $(`(//div[text()='Notifications']/parent::div/div[1]/div)[2]`);
    }
    deviceText(){
        return $(`//div[text()='Devices']`);
    }
    deviceHeaderText(){
        return $(`(//div[text()='Devices'])[2]`);
    }
    devicesGoogleFit(){
        return $(`//div[text()='Google Fit']`);
    }
    devicesAppleHealthKit(){
        return $(`//div[text()='Apple Health Kit']`);
    }
    devicesBackBtn(){
        return $(`//div[text()='Devices']/parent::div/div[1]/div[1]/div`);
    }
    manageCardText(){
        return $(`//div[text()='Manage Card']`);
    }
    manageCardHeaderText(){
        return $(`(//div[text()='Manage Card'])[2]`);
    }
    replaceCardText(){
        return $(`//div[text()='Replace Card']`);
    }
    freezeCardText(){
        return $(`//div[text()='Freeze Card']`);
    }
    manageCardBackBtn(){
        return $(`//div[text()='Manage Card']/parent::div/div[1]/div/button`);
    }

    async profileNameVal(){
        await this.profileNameText(benefitsData.profileNameData).waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.profileNameText(benefitsData.profileNameData).isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async mailIdVal(){
        await this.mailIdText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.mailIdText().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async personalTextVal(){
        await this.personalText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.personalText().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async personalLinkVal(){
        await this.personalText().click();
        await this.personalHeader().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.personalHeader().isDisplayed();
        expect(isDisplayed).to.be.true;
        const nameIsDisplayed = await this.personalHeader().isDisplayed();
        expect(nameIsDisplayed).to.be.true;
        let profileName = await this.nameValueText().getText();
        assert.equal(profileName, benefitsData.profileNameData);
        const emailIsDisplayed = await this.personalHeader().isDisplayed();
        expect(emailIsDisplayed).to.be.true;
        let profileEmail = await this.emailValueText().getText();
        assert.equal(profileEmail, benefitsData.profileEmailData);
    }

    async navigateToSettingsPage(){
        await this.personalPageBackBtn().waitForDisplayed({ timeout:15000 });
        await this.personalPageBackBtn().click();
    }

    async notificationsTextVal(){
        await browser.pause(4000);
        await this.notificationsText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.notificationsText().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async notificationLinkVal(){
        await browser.pause(2000);
        await this.notificationsText().click();
        await this.notificationsHeaderText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.notificationsHeaderText().isDisplayed();
        expect(isDisplayed).to.be.true;
        expect(await this.whatNotificationReceiveHeader().isDisplayed()).to.be.true;
        expect(await this.whatNotificationRewardsHeader().isDisplayed()).to.be.true;
        expect(await this.whatNotificationDepositsText().isDisplayed()).to.be.true;
        expect(await this.whatNotificationTransactionText().isDisplayed()).to.be.true;
        expect(await this.whatNotificationPromotionText().isDisplayed()).to.be.true;
        expect(await this.whatNotificationSecurityText().isDisplayed()).to.be.true;
       // await browser.pause(65000);
        expect(await this.whereNotificationReceiveHeader().isDisplayed()).to.be.true;
        await this.whereNotificationPushText().scrollIntoView();
        expect(await this.whereNotificationPushText().isDisplayed()).to.be.true;
        expect(await this.whereNotificationEmailText().isDisplayed()).to.be.true;
        expect(await this.whereNotificationSmsText().isDisplayed()).to.be.true;
        await this.notificationsBackBtn().click();
    }

    async devicesTextVal(){
        await this.deviceText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.deviceText().isDisplayed();
        expect(isDisplayed).to.be.true;
    }
    async devicesLinkeVal(){
        await this.deviceText().click();
        await this.deviceHeaderText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.deviceHeaderText().isDisplayed();
        expect(isDisplayed).to.be.true;
        expect(await this.devicesGoogleFit().isDisplayed()).to.be.true;
        expect(await this.devicesAppleHealthKit().isDisplayed()).to.be.true;
        await this.devicesBackBtn().click();
    }

    async manageCardTextVal(){
        await this.manageCardText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.manageCardText().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async manageCardLinkeVal(){
        await this.manageCardText().click();
        await this.manageCardHeaderText().waitForDisplayed({ timeout:15000 });
        await browser.pause(4000);
        const isDisplayed = await this.manageCardHeaderText().isDisplayed();
        expect(isDisplayed).to.be.true;
        expect(await this.replaceCardText().isDisplayed()).to.be.true;
        expect(await this.freezeCardText().isDisplayed()).to.be.true;
        await this.manageCardBackBtn().click();
        await this.manageCardText().waitForDisplayed({ timeout:15000 });
    }
}

module.exports = new BenefitsSettingPage();