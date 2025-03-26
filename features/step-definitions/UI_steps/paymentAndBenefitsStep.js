const { Given, When, Then } = require("@wdio/cucumber-framework");
const paymentsAndBenefits = require("../../pageobjects/ui/paymentsAndBenefits");
const loginPage = require("../../pageobjects/ui/loginPage");
require("dotenv").config();

When(/^user login to benefits application$/, async()=>{
	await loginPage.continueSignIn(process.env.Sunny_Payments_Benefits_qa_URL, process.env.user_qa_name, process.env.pass_qa_word);
});

When(/^the user clicks All Activity hyperlink$/, async() => {
	await paymentsAndBenefits.clickAllActivity();
});


Then(/^the user should navigate to the wallet details screen$/,async () => {
	await paymentsAndBenefits.checkAvailToSpend();
});

Then(/^the user clicks on a wallet with no transactions in the Wallets View All screen$/,async () => {
	await paymentsAndBenefits.clickOnFood();
});

Then(/^user validates the wallet details screen with no transaction data$/,async () => {
	await paymentsAndBenefits.verifyTransaction()
});

Given(/^the user is on the home screen$/,async () => {
	await paymentsAndBenefits.checkAvailToSpend();
});


When(/^the user navigates to the For You section$/,async () => {
	await paymentsAndBenefits.navigateToForYou();
});

Then(/^the user should be able to navigate to For You details page$/, async() => {
	await paymentsAndBenefits.verifyForYou();
});


Then(/^the user clicks the View All hyperlink in the For You cards section$/,async () => {
	await paymentsAndBenefits.ClickforYouViewAll();
});


Then(/^the user should be navigated to the For You View All screen$/,async () => {
	await paymentsAndBenefits.verifyForYouDetail();
});

Then(/^the user clicks on a For You card$/,async () => {
	await paymentsAndBenefits.clickOtcCard();
});

Then(/^the user should be able to view the details page for that For You card$/,async () => {
	await paymentsAndBenefits.verifyCardDetail();
});

Then(/^the user clicks the Chrome browser back button$/,async () => {
	await paymentsAndBenefits.clickBackBtnCardDetail();
});

Then(/^the user should be navigated back to the For You card details page$/,async () => {
	await paymentsAndBenefits.verifyForYouDetail();
	await paymentsAndBenefits.clickBackBtn();
});

Then(/^a maximum of two Maximize Benefits cards should be displayed$/,async () => {
	await paymentsAndBenefits.verifyNumberOfCards();
});

When(/^the user clicks the play button on the video card$/,async () => {
	await paymentsAndBenefits.clickPlayVideo(1);
});

Then(/^the video should play and able to close$/,async () => {
	await paymentsAndBenefits.clickCloseVideo();
});

Then(/^user should navigate to Benefits View All screen$/,async () => {
	await paymentsAndBenefits.clickMaximizeBeniftsViewAll(3);
});

Then(/^the user clicks the play button on any benefit card$/,async () => {
	await paymentsAndBenefits.clickPlayVideo(3);
});

When(/^the user clicks the close button$/,async () => {
	await paymentsAndBenefits.clickCloseVideo();
});

Then(/^the user should be navigated back to the previous screen$/,async () => {
	await paymentsAndBenefits.verifyMaximizeBenifits();
});

Then(/^the user validate available balance description text and balance amount is diplayed to be true$/,async () => {
	debugger;
	await paymentsAndBenefits.verifyAvailableBalText();
	await paymentsAndBenefits.verifyBalAmt();
});

Then(/^user validate rewards section$/,async () => {
	await paymentsAndBenefits.verifyRewardSection();
});

When(/^user navigate to setting page$/,async () => {
	await paymentsAndBenefits.clickOnSettingsBtn();
});
