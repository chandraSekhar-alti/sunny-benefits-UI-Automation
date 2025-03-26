Feature: verifying ETL flow
Scenario: Verifying test card creation of new accounts for a given tenant.
When User deletes all the etl files present in the etl folder
When User captures X-API_SESSION-KEY from token API in Dev
When User creates 30 consumer using the data-feed-member API
# Then User opens command promt and execute command to verify consumers
# Then User validate newly created consumers from etl file
