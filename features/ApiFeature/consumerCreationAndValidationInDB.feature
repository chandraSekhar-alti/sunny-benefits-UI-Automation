Feature: verifying consumer creation Api and validate details in db
Scenario: create a consumer and validate wallet details for both rewards and benefits.
When User creates a new consumer using the data-feed-member API
Then User captures all the wallets available for the created consumer from fis tenant account table
Then User verifies consumer wallet in wallet tables
And User verifies master wallet entries in wallet_type table
Then User verifies consumer wallet in wallet tables for rewards
Then User verifies consumer master wallet in wallet tables for rewards