Feature: verifying Trivia task enrolling flow
Scenario: Validating the trivia task enrollment flow by creating a consumer,enrolling the task, then answer the questions 
When User creates a consumer using datafeed API
And User captures JWT token by sending a post request to consumer-login api
When User is landing in Home page
Then User captures Trivia task Id from getAllConsumerTasks
Then User captures trivia rewardid
Then Trivia questions is displayed for the user
