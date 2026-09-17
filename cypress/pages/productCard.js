class ProductCard {
    elements = {
        productList: () => cy.get(".product-grid .item-box"),
        productName: ".product-title a",
        productCard: ".item-box",
        productPrice: ".price.actual-price",
        addToCartButton: ".product-box-add-to-cart-button",
        successMessageCloseButton: ".close",
        loader: () => cy.get(".ajax-loading-block-window"),
    };

    clickAddToCartButton(productName) {
        return this.elements.productList()
            .contains(this.elements.productName, productName)
            .closest(this.elements.productCard)
            .find(this.elements.addToCartButton)
            .click()
            .then(() => {
                this.elements.loader().should("not.be.visible");
            });
    }

    getProductDetails(productName) {
        return this.elements.productList()
            .contains(this.elements.productName, productName)
            .closest(this.elements.productCard)
            .then(($card) => ({
                name: $card.find(this.elements.productName).text().trim(),
                qty: "1",
            }));
    }
}

export default ProductCard;