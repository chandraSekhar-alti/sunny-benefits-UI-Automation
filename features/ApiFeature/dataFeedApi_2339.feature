Feature: verifying data feed API with X-API-SESSION-KEY

Scenario: 1.Validating  200 response codes for data feed API with valid X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
When User creates a new consumer using the data-feed-member API

Scenario: 2.Validating  4** response codes for data feed API with junk X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
Then validating response code of data feed api with junk session key

Scenario: 3.Validating  4** response codes for data feed API with empty X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
Then validating response code of data feed api with empty session key

Scenario: 4.Validating 200 response codes for tenant API with valid X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
When validating response code for data feed tenant api with valid session key

Scenario: 5.Validating  4** response codes for tenant API with junk X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
Then validating response code of tenant api with junk session key

Scenario: 6.Validating  4** response codes for tenant API with empty X-API-SESSION-KEY
When User captures X-API_SESSION-KEY from token API
Then validating response code of tenant api with empty session key

