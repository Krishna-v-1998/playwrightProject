Feature: Ecommerce Validations


    Scenario: Placing the Orders
    Given a Login in 'anshika@gmail.com' and 'Iamking@000'
    When Add 'ZARA COAT 3' to the Cart
    Then Verify 'ZARA COAT 5' is displayed in the Cart
    When Enter Valid Details and Place Orders
    Then Verify Order is present in Order Summary