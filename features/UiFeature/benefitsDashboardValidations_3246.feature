Feature: Sunny Benefits - Validating benefits dashboard page

Scenario: 1.validating wallet balance, reward section and forYou section
When user login to benefits application
Then the user validate available balance description text and balance amount is diplayed to be true
And user validate rewards section
When the user navigates to the For You section
Then the user should be able to navigate to For You details page