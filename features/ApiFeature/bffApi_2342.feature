Feature: verifying home page api's performance

Scenario: 1.Checking performance of consumer summary API invoked from home screen
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of consumer summary api

Scenario: 2.Checking performance of getTenantCodeByConsumer API invoked from home screen
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of get tenant code by consumer api

Scenario: 3.Checking performance of getConsumerSubTask API invoked from home screen
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of get consumer subtask api

Scenario: 4.Checking performance of getComponentList API invoked from home screen
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of component list api

Scenario: 5.Checking performance of getAvailableTriviaTasks API invoked from home screen
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of trivia tasks api

