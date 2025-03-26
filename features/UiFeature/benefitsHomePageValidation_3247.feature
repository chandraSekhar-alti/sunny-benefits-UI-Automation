Feature: Sunny Benefits - Home Page Validation
Scenario: 1.Validating Wallet Details Screen from All Activity
When user login to benefits application
And the user clicks All Activity hyperlink
Then the user should navigate to the wallet details screen
And the user clicks on a wallet with no transactions in the Wallets View All screen
Then user validates the wallet details screen with no transaction data

Scenario: 2.Validating For You Details Page from Home
When user login to benefits application
When the user navigates to the For You section
Then the user should be able to navigate to For You details page
And the user clicks the View All hyperlink in the For You cards section
Then the user should be navigated to the For You View All screen
And the user clicks on a For You card
Then the user should be able to view the details page for that For You card
And the user clicks the Chrome browser back button
Then the user should be navigated back to the For You card details page

Scenario: 3.Validating Maximize Benefits Cards Limit on Home Screen
When user login to benefits application
Then a maximum of two Maximize Benefits cards should be displayed
When the user clicks the play button on the video card
Then the video should play and able to close
Then user should navigate to Benefits View All screen
And the user clicks the play button on any benefit card
When the user clicks the close button
Then the user should be navigated back to the previous screen