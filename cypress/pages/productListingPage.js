class ProductListingPage {

    elements = {
        pageTitle: ".page-title h1",
        productList: () => cy.get(".product-grid .item-box"),
        productImage: ".picture img",
        productPrice: ".prices .actual-price",
        productName: ".product-title a",
        sortingDropdown: () => cy.get("#products-orderby"),

        sortByNameAtoZ: "Name: A to Z",
        sortByNameZtoA: "Name: Z to A",
        sortByPriceLtoH: "Price: Low to High",
        sortByPriceHtoL: "Price: High to Low",

        priceFilter: ".price-range-filter",
        removePriceFilter: () => cy.get(".remove-price-range-filter"),
    };

    sortProducts(sortBy) {
        this.elements.sortingDropdown().select(sortBy);
    }

    getProductNameList() {
        const nameList = [];

        return this.elements.productList()
            .find(this.elements.productName)
            .each(($el) => {
                nameList.push($el.text().trim());
            })
            .then(() => nameList);
    }

    getProductPriceList() {
        const priceList = [];

        return this.elements.productList()
            .find(this.elements.productPrice)
            .each(($el) => {
                priceList.push(parseFloat($el.text().trim()));
            })
            .then(() => priceList);
    }

    applyPriceFilter(priceFilter) {
        cy.contains(priceFilter)
            .should("be.visible")
            .click();

        this.elements.removePriceFilter()
            .should("be.visible");
    }
}

export default ProductListingPage;
