Feature: Testing find store API from BenefitsBff

  Scenario: Checking the stores available for a paticular zipcode
    When User finds a store by hitting find-store api
    Then User validate the find-store api response
