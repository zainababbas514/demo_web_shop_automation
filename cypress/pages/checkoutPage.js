class CheckoutPage {
    elements = {
        firstNameInput: () => cy.get("#BillingNewAddress_FirstName"),
        lastNameInput: () => cy.get("#BillingNewAddress_LastName"),
        emailInput: () => cy.get("#BillingNewAddress_Email"),
        companyInput: () => cy.get("#BillingNewAddress_Company"),

        countryDropdown: () => cy.get("#BillingNewAddress_CountryId"),
        stateDropdown: () => cy.get("#BillingNewAddress_StateProvinceId"),
        stateLoading: () => cy.get("#states-loading-progress"),

        cityInput: () => cy.get("#BillingNewAddress_City"),
        address1Input: () => cy.get("#BillingNewAddress_Address1"),
        address2Input: () => cy.get("#BillingNewAddress_Address2"),
        zipInput: () => cy.get("#BillingNewAddress_ZipPostalCode"),
        phoneInput: () => cy.get("#BillingNewAddress_PhoneNumber"),
        faxInput: () => cy.get("#BillingNewAddress_FaxNumber"),

        billingAddressContinueButton: () => cy.get("#billing-buttons-container input"),
        shippingAddressContinueButton: () => cy.get(".new-address-next-step-button:visible"),
        shippingMethodContinueButton: () => cy.get(".shipping-method-next-step-button:visible"),
        paymentMethodContinueButton: () => cy.get(".payment-method-next-step-button"),
        paymentInfoContinueButton: () => cy.get(".payment-info-next-step-button"),

        confirmOrderButton: () => cy.get(".confirm-order-next-step-button"),
        shippingMethodLabels: () => cy.get(".method-list label"),
        shippingMethodRadios: () => cy.get('input[name="shippingoption"]'),
        paymentMethodLabels: () => cy.get(".payment-method .method-list label"),
        paymentMethodRadios: () => cy.get('input[name="paymentmethod"]'),
    };

    enterText(element, value) {
        if (value) {
            element()
                .clear()
                .type(value);
        }
    }

    selectDropdown(element, value, waitForEnabled = false) {
        element()
            .should("be.visible");

        if (waitForEnabled) {
            element().should("not.be.disabled");
        }

        element().select(value);
    }

    clickContinueButton(element) {
        element()
            .should("be.visible")
            .and("be.enabled")
            .click();
    }

    fillBillingAddress(address) {
        this.enterText(this.elements.firstNameInput, address.firstName);
        this.enterText(this.elements.lastNameInput, address.lastName);
        this.enterText(this.elements.emailInput, address.email);
        this.enterText(this.elements.companyInput, address.company);

        this.selectDropdown(
            this.elements.countryDropdown,
            address.country
        );

        this.selectDropdown(
            this.elements.stateDropdown,
            address.state,
            true
        );

        this.enterText(this.elements.cityInput, address.city);
        this.enterText(this.elements.address1Input, address.address1);
        this.enterText(this.elements.address2Input, address.address2);
        this.enterText(this.elements.zipInput, address.zip);
        this.enterText(this.elements.phoneInput, address.phone);
        this.enterText(this.elements.faxInput, address.fax);

        this.clickContinueButton(
            this.elements.billingAddressContinueButton
        );
    }

    selectShippingMethod(methodName) {
        this.elements.shippingMethodLabels()
            .contains(methodName)
            .should("be.visible")
            .click();
    }

    selectPaymentMethod(methodName) {
        this.elements.paymentMethodLabels()
            .contains(methodName)
            .should("be.visible")
            .click();
    }
}

export default CheckoutPage;