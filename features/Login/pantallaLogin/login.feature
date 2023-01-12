Feature: CMS login page

Scenario: an authorized user can access the CMS
  Given I am the hotel staff 
  And I access the CMS login page
  When I inform correct credentials
  And I select to Sign in 
  Then I am taken to the hotel dashboard