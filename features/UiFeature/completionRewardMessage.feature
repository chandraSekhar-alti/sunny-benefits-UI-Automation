Feature: Validate Completion Reward Message
Scenario: Validating the Top rated gift card and message after reaching the max limit before and after completing the pending entries
When User creates a consumer using datafeed API
When User is landing in Home page
Then User is checking the send button and enrolling all the tasks to reach the max limit and then validate the message before and after completing the entries
