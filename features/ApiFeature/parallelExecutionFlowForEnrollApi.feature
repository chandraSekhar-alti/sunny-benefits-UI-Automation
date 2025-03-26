Feature: verifying multi thread while enrolling and completing the task api
Scenario: Validating the task enrollment flow by creating a consumer, enrolling two tasks task, and then complete one task
When User creates a new consumer using the data-feed-member API
And User captures JWT token by sending a post request to consumer-login api
Then Hitting enroll API parallely to verify the response
And Consumer completes a task using task update API
