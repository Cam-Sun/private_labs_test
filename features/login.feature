Feature: User Login
  As a user of Swag Labs
  I want to be able to log in and out
  So that I can access the store

  Background:
    Given I am on the login page

  Scenario: Successful login with standard user
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be on the inventory page
    And I should see the products list

  Scenario: Locked out user cannot log in
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should see the error message "Sorry, this user has been locked out."

  Scenario: Login fails with invalid credentials
    When I enter username "invalid_user" and password "wrong_password"
    And I click the login button
    Then I should see an error message about incorrect credentials

  Scenario: Login fails with empty username
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then I should see an error message about the username being required

  Scenario: Login fails with empty password
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should see an error message about the password being required

  Scenario: User can log out after logging in
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be on the inventory page
    When I open the burger menu
    And I click the logout link
    Then I should be on the login page
