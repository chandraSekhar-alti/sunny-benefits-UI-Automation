const fs = require("fs");
const { expect , assert} = require("chai");
const benefitsData = require("../../../data/UIBenefitsData.json");

class PaymentsAndBenefits{
    allActivity() {
        return $("//div[text()='All Activity']");
      }
    availToSpend(){
        return $("(//div[text()='Available to spend'])[2]")
    }
    foodTxt(){
        return $("(//div[text()='Food'])[2]")
    }
    transactionTxt(){
        return $("(//div[contains(text(),'Transactions')])[1]")
    }
    backArrow(){
        return $("//img[contains(@src,'ic_arrow_left')]")
    }
    backArrowCardDetail(){
        return $("(//img[contains(@src,'ic_arrow_left')])[2]")
    }
    forYouTxt(){
        return $("//div[text()='For you']")
    }
    forYouViewAll(){
        return $("//div[text()='For you']/parent::div/following-sibling::div")
    }
    otcSeeHow(){
        return $("(//div[text()='OTC']/following::div[text()='See How'])[2]")
    }
    foodForYouInteg(){
        return $("//div[text()='Food is medicine']/following::div[text()='Learn More']")
    }

    hearingBenifitsTxt(){
        return $("//div[text()='Maximize your Hearing benefit']")
    }
    maximizeBenifitsCards(){
        return $$("(//div[text()='Maximize your benefits']/../../following-sibling::div//div)[2]/child::div")
    }
    playBtn(index){
        return $(`(//img[contains(@src,'ic_play')])[${index}]`)
    }
    autoplay(){
        return $("//video[@autoplay]")
    }
    closeVideo(){
        return $("//img[contains(@src,'ic_close')]/parent::div/..")
    }
    maximizeBeniftsViewAll(){
        return $("//div[text()='Maximize your benefits']/parent::div/following-sibling::div")
    }
    maximizeBenifits(){
        return $("(//div[text()='Maximize your benefits'])[2]")
    }

    balanceAmt(){
        return $("//div[text()='Available to spend']/parent::div/following-sibling::div/div[2]");
    }

    availableBalText(){
        return $("//div[text()='$']/parent::div/preceding-sibling::div/div");
    }

    rewardsSection(){
        return $("//div[text()='Rewards']");
    }

    settingsBtn(){
        return $("//div[text()='Settings']");
    }

    async clickAllActivity(){
        await this.allActivity().waitForDisplayed({ timeout:30000 })
        await this.allActivity().click();
    }
    async checkAvailToSpend(){
        await this.availToSpend().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.availToSpend().isDisplayed()
        expect(isDisplayed).to.be.true;
    }
    async clickOnFood(){
        await this.foodTxt().waitForDisplayed({ timeout:15000 })
        await this.foodTxt().click();
    }
    async verifyTransaction(){
        const isDisplayed = await this.transactionTxt().isDisplayed()
        expect(isDisplayed).to.be.false;
        await this.backArrow().click();
    }

    async verifyForYou(){
        await this.forYouTxt().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.forYouTxt().isDisplayed()
        await browser.pause(4000);
        expect(isDisplayed).to.be.true;
    }
    async ClickforYouViewAll(){
        await this.forYouViewAll().click();
        await browser.pause(4000);
    }
    async navigateToForYou(){
        await this.forYouTxt().scrollIntoView(); 
        const isDisplayed = await this.forYouTxt().isDisplayed()
        expect(isDisplayed).to.be.true;
    }
    async verifyForYouDetail(){
        await this.foodForYouInteg().waitForDisplayed({ timeout:15000 })
        await browser.pause(4000);
       // const isDisplayed = await this.otcSeeHow().isDisplayed()
        //expect(isDisplayed).to.be.true;
    }
    async clickOtcCard(){
        await this.foodForYouInteg().click();
    }
    async verifyCardDetail(){
        await this.hearingBenifitsTxt().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.hearingBenifitsTxt().isDisplayed()
        expect(isDisplayed).to.be.true;
    }
    async clickBackBtn(){
        await this.backArrow().click();
    }
    async clickBackBtnCardDetail(){
        await this.backArrowCardDetail().click();
    }
    async verifyNumberOfCards(){
        await this.maximizeBeniftsViewAll().scrollIntoView();
        await browser.setTimeout({ implicit: 15000 });
        const benefitsCards = await this.maximizeBenifitsCards();
        expect(benefitsCards.length).to.equal(2);
    }
    async clickPlayVideo(playBtnIndex){
        await this.playBtn(playBtnIndex).click();
        await browser.setTimeout({ implicit: 5000 });
        const videoElement = await $('video');
        const autoplayAttribute = await videoElement.getAttribute('autoplay'); 
        expect(autoplayAttribute).to.be.oneOf(['',null]);
        await browser.pause(4000);
    }
    async clickCloseVideo(){
        await this.closeVideo().click();
    }
    async clickMaximizeBeniftsViewAll(){
        await this.maximizeBeniftsViewAll().click();
    }
    async verifyMaximizeBenifits(){
        await this.maximizeBenifits().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.maximizeBenifits().isDisplayed();
        expect(isDisplayed).to.be.true;
    }

    async verifyAvailableBalText(){
        await this.availableBalText().waitForDisplayed({ timeout:15000 });
        const text = await this.availableBalText().getText();
        assert.equal(text, benefitsData.availableBalText);
    }
    async verifyBalAmt(){
        await this.balanceAmt().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.balanceAmt().isDisplayed();
        expect(isDisplayed).to.be.true;
    }
    async verifyRewardSection(){
        await this.rewardsSection().scrollIntoView();
        await this.rewardsSection().waitForDisplayed({ timeout:15000 })
        const isDisplayed = await this.rewardsSection().isDisplayed();
        expect(isDisplayed).to.be.true;
    }
    async clickOnSettingsBtn(){
        await this.settingsBtn().waitForDisplayed({ timeout:15000 });
        await this.settingsBtn().click();
    }
}

module.exports = new PaymentsAndBenefits();