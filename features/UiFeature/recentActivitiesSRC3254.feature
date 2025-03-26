Feature: verifying Task enrolling flow
Scenario: Validating the task enrollment flow by creating a consumer,enrolling the task
When User creates a consumer using datafeed API
When User is landing in Home page
Then User is enrolling a task then Checking the pending task status and completing the task