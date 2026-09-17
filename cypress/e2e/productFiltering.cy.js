const filteringData = require("../fixtures/productFilterData.json");

import HomePage from "../pages/homePage";
import ProductListingPage from "../pages/productListingPage";
import SearchPage from "../pages/searchPage";

const homePage = new HomePage();
const productListingPage = new ProductListingPage();
const searchPage = new SearchPage();

describe("Product Filtering and Search", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    filteringData["price_filters"].priceFilters.forEach((priceFilter) => {

        it(`validate the price filter ${priceFilter} works`, () => {
            const data = filteringData["price_filters"];

            homePage.topMenu().openCategory(
                data.category,
                data.subCategory
            );

            productListingPage.applyPriceFilter(priceFilter);

            productListingPage.getProductPriceList().then((priceList) => {
                const filterText = priceFilter.trim();
                const values = filterText
                    .match(/\d+(?:\.\d+)?/g)
                    .map(Number);

                if (filterText.includes("Under")) {
                    expect(
                        priceList.every((price) => price <= values[0]),
                        `All products should be priced at or below ${values[0]}`
                    ).to.be.true;

                } else if (filterText.includes("Over")) {
                    expect(
                        priceList.every((price) => price >= values[0]),
                        `All products should be priced at or above ${values[0]}`
                    ).to.be.true;

                } else {
                    expect(
                        priceList.every(
                            (price) =>
                                price >= values[0] &&
                                price <= values[1]
                        ),
                        `All products should be priced between ${values[0]} and ${values[1]}`
                    ).to.be.true;
                }
            });
        });
    });

    filteringData["search"].forEach((data) => {

        it(`validate search results for "${data.searchText}"`, () => {
            homePage.header().searchProducts(data.searchText);

            cy.waitForPageElement(
                searchPage.elements.searchPageHeading
            );

            searchPage.getProductNames().then((nameList) => {
                const normalizedSearchText =
                    data.searchText.trim().toLowerCase();

                const allResultsMatch = nameList.every((item) =>
                    item.includes(normalizedSearchText)
                );

                expect(
                    allResultsMatch,
                    "All search results should match the search term"
                ).to.be.true;
            });
        });
    });
});
