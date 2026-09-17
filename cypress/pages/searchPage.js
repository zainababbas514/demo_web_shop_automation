class SearchPage {
    elements = {
        productList: () => cy.get(".product-grid .item-box"),
        productName: ".product-title a",
        searchPageHeading: ".search-page .page-title",
    };

    getProductNames() {
        const nameList = [];

        return this.elements.productList()
            .find(this.elements.productName)
            .each(($el) => {
                nameList.push(
                    $el.text().trim().toLowerCase()
                );
            })
            .then(() => nameList);
    }
    
}

export default SearchPage;