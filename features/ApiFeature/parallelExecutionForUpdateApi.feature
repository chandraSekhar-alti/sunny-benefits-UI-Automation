Feature: verifying multi thread while completing the task api
Scenario: Validating the task enrollment flow by creating a consumer, enrolling a task, and then complete task
When User creates a new consumer using the data-feed-member API
And User captures JWT token by sending a post request to consumer-login api
Then Consumer enrolls a tasks using the enroll API
And Hitting update API parallely to verify the response
