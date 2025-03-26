Feature: verifying no pending actions
Scenario:1. Validating the task enrollment flow and checking the the label when no penidng actions
When User creates a consumer using datafeed API
When User is landing in Home page
Then User is launching the consumer and validating the label when no penidng actions
 
Scenario:2. Validating the task enrolling more than 3 tasks and validating whether only 3 tasks are displaying under Pending Action section
When User creates a consumer using datafeed API
When User is landing in Home page
Then User is enrolling more than 3 tasks and validating whether only 3 tasks are displaying under Pending Action section