class Header {
    elements = {
        header_links: () => cy.get(".header-links ul li a"),
        shoppingCartOption: () => cy.get("#topcartlink .ico-cart"),
        cartQuantity: () => cy.get("#topcartlink .cart-qty"),
        headerLogo: () => cy.get(".header-logo a"),
        searchInput: () => cy.get(".search-box #small-searchterms"),
        searchBtn: () => cy.get(".search-box-button"),
        addToCartSuccessMessage: () => cy.get(".bar-notification.success"),
    };

    click_header_link(link_text) {
        this.elements.header_links()
            .contains(link_text)
            .should("be.visible")
            .click();
    }

    clickHeaderLogo() {
        this.elements.headerLogo().click();
    }

    clickShoppingCartOption() {
        this.elements.shoppingCartOption()
            .should("be.visible")
            .click();
    }

    checkCartQuantity(expectedQuantity) {
        this.elements.cartQuantity().then(($quantity) => {
            const cartQuantity = $quantity.text().match(/\d+/)[0];
            expect(cartQuantity).to.equal(expectedQuantity.toString());
        });
    }

    searchProducts(searchText) {
        this.elements.searchInput().type(searchText);
        this.elements.searchBtn().click();
    }
    
    verifyAddToCartSuccessMessage() {
        this.elements.addToCartSuccessMessage()
            .should("be.visible");
    }
}

export default Header;