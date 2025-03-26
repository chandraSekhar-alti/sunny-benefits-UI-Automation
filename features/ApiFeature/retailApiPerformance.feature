Feature: Testing the performance of retail API

  Scenario: Determine max parallel calls until requests fail
    When User invokes products API endpoint with multiple threads
    Then User determine the maximum parallel calls before failures occur
