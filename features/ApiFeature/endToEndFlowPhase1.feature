Feature: verifying Api end-to-end flow
Scenario: Validating the task enrollment flow by creating a consumer, enrolling two tasks task, and then complete one task
When User creates a new consumer using the data-feed-member API
And User captures JWT token by sending a post request to consumer-login api
Then Consumer enrolls two tasks using the enroll API
Then User verifies enroll task API response with the db data from cosumer_task table
Then Consumer completes a task using task update API
When User checks balance amount with balance Api and launches the prizeout success
Then User validate consumer balance amount from wallet_transaction table
