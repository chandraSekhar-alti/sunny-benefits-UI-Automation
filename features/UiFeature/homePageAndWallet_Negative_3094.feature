Feature: verifying sweepstakes home page and wallet balance negative flows
# Scenario: 1. Validating wallet balance by enrolling a sweeptstake task 
# Given User creates a sweepstakes consumer
# When User login to the application with sweepstake consumer code
# And User closes trivia popup
# And User enroll a sweepstake task validate task in pending section
# Then User validates sweepstake wallet balance 

Scenario: 2. Validating message when no task is enrolled
When User login to the application with sweepstake consumer code with no task enrolled
And User closes trivia popup
Then User navigates to all actions page and validate the message under pending section