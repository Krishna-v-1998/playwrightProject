Feature: Ecommerce Validations


    Scenario Outline: Placing the Orders
        Given a Login to Ecommerce2 application using '<username>' and '<password>'
        Then Verify error message is displayed

        Examples:
            | username          | password    |
            | anshika@gmail.com | Iamking@000 |
            | hello@mail.com    | Iamking     |