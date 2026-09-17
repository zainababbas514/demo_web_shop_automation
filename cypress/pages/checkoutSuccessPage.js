class CheckoutSuccessPage {
    elements = {
        successMessage: () => cy.get(".order-completed strong"),
    };

    verifySuccessMessageDisplayed() {
        // Verify that the order confirmation message is displayed after checkout.
        this.elements.successMessage()
            .should("be.visible")
            .and("have.text", "Your order has been successfully processed!");
    }
};

export default CheckoutSuccessPage;