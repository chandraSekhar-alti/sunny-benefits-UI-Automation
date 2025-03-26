Feature: verifying sunny rewards home page api's performance with multiple users

Scenario: 1.Checking performance of consumer summary API invoked from home screen by using multiple threads
When User captures JWT token by sending a post request to consumer-login api
Then validating performance of consumer summary api with multiple users at a time

# Scenario: 2.Checking performance of getTenantCodeByConsumer API invoked from home screen by using multiple threads
# When User captures JWT token by sending a post request to consumer-login api
# Then validating performance of get tenant code by consumer api with multiple users at a time

# Scenario: 3.Checking performance of getConsumerSubTask API invoked from home screen by using multiple threads
# When User captures JWT token by sending a post request to consumer-login api
# Then validating performance of get consumer subtask api with multiple users at a time

# Scenario: 4.Checking performance of getComponentList API invoked from home screen by using multiple threads
# When User captures JWT token by sending a post request to consumer-login api
# Then validating performance of component list api with multiple users at a time

# Scenario: 5.Checking performance of getConsumerByEmail API invoked from home screen by using multiple threads
# Then validating performance of get consumer by email api with multiple users at a time

# Scenario: 6.Checking performance of getTenantByConsumerCode API invoked from home screen by using multiple threads
# Then validating performance of get tenant by consumer code api with multiple users at a time

# Scenario: 7.Checking performance of wallet API invoked from home screen by using multiple threads
# Then validating performance of wallet api with multiple users at a time

# Scenario: 8.Checking performance of transactions API invoked from home screen by using multiple threads
# Then validating performance of transactions api


