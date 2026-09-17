class ProductDetailPage {
    elements = {
        processorRadios: () => cy.get("#product_attribute_16_5_4"),
        ramRadios: () => cy.get("#product_attribute_16_6_5"),
        hddRadios: () => cy.get("input[name='product_attribute_16_3_6']"),
        osRadios: () => cy.get("input[name='product_attribute_16_4_7']"),
        softwareCheckboxes: () => cy.get("input[name='product_attribute_16_8_8']"),
        addToCartBtn: () => cy.get(".add-to-cart-button"),
        addToCartSuccessMessage: () => cy.get(".bar-notification.success"),
        productContainer: () => cy.get(".product-details-page"),
        productImage: ".picture img",
        productName: ".product-name",
        quantity: ".qty-input",
    };

    selectByValue(element, value) {
        element
            .select(value)
            .should("have.value", value);
    }

    selectRadioByValue(element, value) {
        element.check(value);
    }

    selectCheckBoxByValue(element, value) {
        element.then(($els) => {
            // Clear any existing selection before selecting the requested option.
            cy.wrap($els).uncheck();
            cy.wrap($els).check();
        });
    }

    clickAddToCartBtn() {
        this.elements.addToCartBtn().click();
    }

    applyComputerConfiguration(selections) {
        this.selectByValue(
            this.elements.processorRadios(),
            selections.Processor.value
        );

        this.selectByValue(
            this.elements.ramRadios(),
            selections.RAM.value
        );

        this.selectRadioByValue(
            this.elements.hddRadios(),
            selections.HDD.value
        );

        this.selectRadioByValue(
            this.elements.osRadios(),
            selections.OS.value
        );

        this.selectCheckBoxByValue(
            this.elements.softwareCheckboxes(),
            selections.Software.value
        );

        this.clickAddToCartBtn();

        // Verify that the product was successfully added after configuration.
        this.elements.addToCartSuccessMessage()
            .should("be.visible");
    }

    applyConfiguration(productType, selections) {
        switch (productType) {
            case "computer":
                this.applyComputerConfiguration(selections);
                break;

            default:
                cy.log("No configuration required");
        }
    }

    getProductDetails() {
        return this.elements.productContainer()
            .then(($card) => ({
                name: $card.find(this.elements.productName).text().trim(),
                qty: $card.find(this.elements.quantity).val(),
            }));
    }
}

export default ProductDetailPage;