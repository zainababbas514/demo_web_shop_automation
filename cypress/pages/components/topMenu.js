class TopMenu {
    elements = {
        categoryMenu: () => cy.get(".header-menu .top-menu"),
        categoriesSubList: (category) => category.find(".sublist li"),
    };

    openCategory(categoryName, subCategory = null) {
        this.elements.categoryMenu()
            .should("be.visible")
            .contains(categoryName)
            .closest("li")
            .then((category) => {
                const subCategories = this.elements.categoriesSubList(category);

                if (subCategory && subCategories.length > 0) {
                    // Hover over the category to reveal its subcategories.
                    cy.wrap(category).trigger("mouseover");

                    cy.wrap(subCategories)
                        .contains(subCategory)
                        .click();
                } else {
                    cy.wrap(category).click();
                }
            });
    }
}

export default TopMenu;