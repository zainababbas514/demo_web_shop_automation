class CartPage {
    elements = {
        cartTotalItems: () => cy.get(".cart-item-row"),
        productName: ".product-name",
        productUnitPrice: ".unit-price .product-unit-price",
        productUnitTotal: ".subtotal .product-subtotal",
        quantity: ".qty-input",
        pageTitle: () => cy.get(".shopping-cart-page .page-title h1"),
        updateCartBtn: () => cy.get(".update-cart-button"),
        countryDropdown: () => cy.get("#CountryId"),
        stateDropdown: () => cy.get("#StateProvinceId"),
        zipCodeInput: () => cy.get("#ZipPostalCode"),
        termsCheckbox: () => cy.get("#termsofservice"),
        cartTotalSectionHeadings: () => cy.get(".cart-total-left .nobr"),
        cartTotalSectionTotals: ".product-price",
        total: () => cy.get(".product-price.order-total"),
        checkoutBtn: () => cy.get("#checkout"),
    };

    getCartProductsList() {
        const products = [];

        return this.elements.cartTotalItems()
            .each(($el) => {
                products.push({
                    name: $el.find(this.elements.productName).text().trim(),
                    qty: $el.find(this.elements.quantity).val(),
                    price: $el.find(this.elements.productUnitPrice).text().trim(),
                });
            })
            .then(() => products);
    }

    verifyTotalUnitPrice() {
        const priceList = [];

        return this.elements.cartTotalItems()
            .each(($item) => {
                const unitPrice = parseFloat(
                    $item.find(this.elements.productUnitPrice).text()
                );
                const quantity = Number(
                    $item.find(this.elements.quantity).val()
                );
                const subtotal = unitPrice * quantity;
                const name = $item.find(this.elements.productName).text();

                this.elements.cartTotalItems()
                    .contains(name)
                    .closest(".cart-item-row")
                    .find(this.elements.productUnitTotal)
                    .should("have.text", subtotal.toFixed(2));

                priceList.push(subtotal.toFixed(2));
            })
            .then(() => priceList);
    }

    changeCartQuantity(name, quantity) {
        this.elements.cartTotalItems()
            .contains(this.elements.productName, name)
            .closest(".cart-item-row")
            .find(this.elements.quantity)
            .clear()
            .type(quantity)
            .should("have.value", quantity);
    }

    clickUpdateCartBtn() {
        this.elements.updateCartBtn().click();
    }

    selectCountry(name) {
        this.elements.countryDropdown()
            .should("not.be.disabled")
            .and("be.visible")
            .select(name);
    }

    selectState(state) {
        this.elements.stateDropdown()
            .should("not.be.disabled")
            .and("be.visible")
            .select(state);
    }

    checkTermsConditions() {
        this.elements.termsCheckbox()
            .check()
            .should("be.checked");
    }

    getCartValueByLabel(label) {
        return this.elements.cartTotalSectionHeadings()
            .contains(label)
            .parent()
            .next()
            .find(this.elements.cartTotalSectionTotals)
            .invoke("text")
            .then((text) => parseFloat(text.trim()));
    }

    clickCheckoutBtn() {
        this.elements.checkoutBtn().click();
    }

    getCalculatedCartTotal() {
        let subTotal;
        let shipping;
        let tax;

        this.getCartValueByLabel("Sub-Total:")
            .then((value) => {
                subTotal = value;
            });

        this.getCartValueByLabel("Shipping:")
            .then((value) => {
                shipping = value;
            });

        this.getCartValueByLabel("Tax:")
            .then((value) => {
                tax = value;
            });

        return this.getCartValueByLabel("Total:")
            .then(() => {
                const calculatedTotal = subTotal + shipping + tax;

                return calculatedTotal;
            });
    }
}

export default CartPage;