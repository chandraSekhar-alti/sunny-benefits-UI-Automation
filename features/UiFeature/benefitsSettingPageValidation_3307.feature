Feature: Sunny Benefits - Validating benefits settings page

Scenario: 1.Navigating to setting page and validating all the attributes 
When user login to benefits application
And user navigate to setting page
Then user validates profile name and mail id of the consumer
And user validates personal link under settings
# Then user validates notification link under settings
# And user validates device link under settings
And user validates manage card link under settings