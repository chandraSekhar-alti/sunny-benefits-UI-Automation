const { expect, assert } = require("chai");
const UIActions = require('../../../utils/UIActions');
const Assertions = require('../../../utils/Assertions');
const benefitsData = require("../../../data/UIBenefitsData.json");

class PaymentsAndBenefits {
    // Organized selectors by functionality
    selectors = {
        navigation: {
            allActivity: () => $("//div[text()='All Activity']"),
            backArrow: () => $("//img[contains(@src,'ic_arrow_left')]"),
            backArrowCardDetail: () => $("(//img[contains(@src,'ic_arrow_left')])[2]"),
            settingsBtn: () => $("//div[text()='Settings']")
        },
        wallet: {
            availToSpend: () => $("(//div[text()='Available to spend'])[2]"),
            balanceAmt: () => $("//div[text()='Available to spend']/parent::div/following-sibling::div/div[2]"),
            availableBalText: () => $("//div[text()='$']/parent::div/preceding-sibling::div/div")
        },
        sections: {
            foodTxt: () => $("(//div[text()='Food'])[2]"),
            transactionTxt: () => $("(//div[contains(text(),'Transactions')])[1]"),
            forYouTxt: () => $("//div[text()='For you']"),
            forYouViewAll: () => $("//div[text()='For you']/parent::div/following-sibling::div"),
            rewardsSection: () => $("//div[text()='Rewards']")
        },
        cards: {
            otcSeeHow: () => $("(//div[text()='OTC']/following::div[text()='See How'])[2]"),
            foodForYouInteg: () => $("//div[text()='Food is medicine']/following::div[text()='Learn More']"),
            hearingBenifitsTxt: () => $("//div[text()='Maximize your Hearing benefit']")
        },
        benefits: {
            maximizeBenifitsCards: () => $$("(//div[text()='Maximize your benefits']/../../following-sibling::div//div)[2]/child::div"),
            maximizeBeniftsViewAll: () => $("//div[text()='Maximize your benefits']/parent::div/following-sibling::div"),
            maximizeBenifits: () => $("(//div[text()='Maximize your benefits'])[2]")
        },
        video: {
            playBtn: (index) => $(`(//img[contains(@src,'ic_play')])[${index}]`),
            autoplay: () => $("//video[@autoplay]"),
            closeVideo: () => $("//img[contains(@src,'ic_close')]/parent::div/..")
        }
    }

    /**
     * Clicks on All Activity link
     */
    async clickAllActivity() {
        await UIActions.waitForElementDisplayed(this.selectors.navigation.allActivity(), 30000);
        await UIActions.clickElement(this.selectors.navigation.allActivity());
    }

    /**
     * Checks Available to Spend section
     */
    async checkAvailToSpend() {
        await UIActions.waitForElementDisplayed(this.selectors.wallet.availToSpend(), 15000);
        await Assertions.assertElementIsVisible(this.selectors.wallet.availToSpend());
    }

    /**
     * Clicks on Food section
     */
    async clickOnFood() {
        await UIActions.waitForElementDisplayed(this.selectors.sections.foodTxt(), 15000);
        await UIActions.clickElement(this.selectors.sections.foodTxt());
    }

    /**
     * Verifies transaction section
     */
    async verifyTransaction() {
        await Assertions.assertElementIsNotVisible(this.selectors.sections.transactionTxt());
        await UIActions.clickElement(this.selectors.navigation.backArrow());
    }

    /**
     * Verifies For You section
     */
    async verifyForYou() {
        await UIActions.waitForElementDisplayed(this.selectors.sections.forYouTxt(), 15000);
        await browser.pause(4000);
        await Assertions.assertElementIsVisible(this.selectors.sections.forYouTxt());
    }

    /**
     * Clicks For You View All
     */
    async clickForYouViewAll() {
        await UIActions.clickElement(this.selectors.sections.forYouViewAll());
        await browser.pause(4000);
    }

    /**
     * Navigates to For You section
     */
    async navigateToForYou() {
        await UIActions.scrollToElement(this.selectors.sections.forYouTxt());
        await Assertions.assertElementIsVisible(this.selectors.sections.forYouTxt());
    }

    /**
     * Verifies For You detail page
     */
    async verifyForYouDetail() {
        await UIActions.waitForElementDisplayed(this.selectors.cards.foodForYouInteg(), 15000);
        await browser.pause(4000);
    }

    /**
     * Clicks OTC card
     */
    async clickOtcCard() {
        await UIActions.clickElement(this.selectors.cards.foodForYouInteg());
    }

    /**
     * Verifies card detail
     */
    async verifyCardDetail() {
        await UIActions.waitForElementDisplayed(this.selectors.cards.hearingBenifitsTxt(), 15000);
        await Assertions.assertElementIsVisible(this.selectors.cards.hearingBenifitsTxt());
    }

    /**
     * Clicks back button
     */
    async clickBackBtn() {
        await UIActions.clickElement(this.selectors.navigation.backArrow());
    }

    /**
     * Clicks back button on card detail
     */
    async clickBackBtnCardDetail() {
        await UIActions.clickElement(this.selectors.navigation.backArrowCardDetail());
    }

    /**
     * Verifies number of cards
     */
    async verifyNumberOfCards() {
        await UIActions.scrollToElement(this.selectors.benefits.maximizeBeniftsViewAll());
        await browser.setTimeout({ implicit: 15000 });
        const benefitsCards = await this.selectors.benefits.maximizeBenifitsCards();
        expect(benefitsCards.length).to.equal(2);
    }

    /**
     * Handles video playback
     */
    async clickPlayVideo(playBtnIndex) {
        await UIActions.clickElement(this.selectors.video.playBtn(playBtnIndex));
        await browser.setTimeout({ implicit: 5000 });
        const videoElement = await $('video');
        const autoplayAttribute = await videoElement.getAttribute('autoplay');
        expect(autoplayAttribute).to.be.oneOf(['', null]);
        await browser.pause(4000);
    }

    /**
     * Closes video
     */
    async clickCloseVideo() {
        await UIActions.clickElement(this.selectors.video.closeVideo());
    }

    /**
     * Clicks Maximize Benefits View All
     */
    async clickMaximizeBeniftsViewAll() {
        await UIActions.clickElement(this.selectors.benefits.maximizeBeniftsViewAll());
    }

    /**
     * Verifies Maximize Benefits section
     */
    async verifyMaximizeBenifits() {
        await UIActions.waitForElementDisplayed(this.selectors.benefits.maximizeBenifits(), 15000);
        await Assertions.assertElementIsVisible(this.selectors.benefits.maximizeBenifits());
    }

    /**
     * Verifies available balance text
     */
    async verifyAvailableBalText() {
        await UIActions.waitForElementDisplayed(this.selectors.wallet.availableBalText(), 15000);
        const text = await this.selectors.wallet.availableBalText().getText();
        assert.equal(text, benefitsData.availableBalText);
    }

    /**
     * Verifies balance amount
     */
    async verifyBalAmt() {
        await UIActions.waitForElementDisplayed(this.selectors.wallet.balanceAmt(), 15000);
        await Assertions.assertElementIsVisible(this.selectors.wallet.balanceAmt());
    }

    /**
     * Verifies rewards section
     */
    async verifyRewardSection() {
        await UIActions.scrollToElement(this.selectors.sections.rewardsSection());
        await UIActions.waitForElementDisplayed(this.selectors.sections.rewardsSection(), 15000);
        await Assertions.assertElementIsVisible(this.selectors.sections.rewardsSection());
    }

    /**
     * Clicks on settings button
     */
    async clickOnSettingsBtn() {
        await UIActions.waitForElementDisplayed(this.selectors.navigation.settingsBtn(), 15000);
        await UIActions.clickElement(this.selectors.navigation.settingsBtn());
    }
}

module.exports = new PaymentsAndBenefits();