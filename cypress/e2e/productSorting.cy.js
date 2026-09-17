import HomePage from "../pages/homePage";
import ProductCategoryPage from "../pages/productListingPage";

const homePage = new HomePage();
const productCategoryPage = new ProductCategoryPage();

let sortingData;

describe("Test Sorting Functionality", () => {

    before(() => {
        cy.fixture("productSortingData").then((data) => {
            sortingData = data;
        });
    });

    beforeEach(() => {
        cy.visit("/");
    });

    it("validate sort by Name: A to Z", () => {
        const data = sortingData["sortByNameAtoZ"];
        
        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByNameAtoZ);

        productCategoryPage.elements.sortingDropdown().invoke('val').then(val => {
            cy.url().should('eq', val.trim());
        });

        productCategoryPage.getProductNameList().then($list => {
            const productNamesArrayCopy = [...$list];
            const productNamesArraySorted = $list.sort();
            expect(productNamesArraySorted).to.deep.equal(productNamesArrayCopy);
        });
    });

    it("validate sort by Name: Z to A", () => {
        const data = sortingData["sortByNameZtoA"];

        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByNameZtoA);

        productCategoryPage.elements.sortingDropdown().invoke('val').then(val => {
            cy.url().should('eq', val.trim());
        });

        productCategoryPage.getProductNameList().then($list => {
            const productNamesArrayCopy = [...$list];
            const productNamesArraySorted = $list.sort().reverse();
            expect(productNamesArraySorted).to.deep.equal(productNamesArrayCopy);
        });
    });

    it("validate sort by Price: Low to High", () => {
        const data = sortingData["sortByPriceLowToHigh"];

        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByPriceLtoH);

        productCategoryPage.elements.sortingDropdown().invoke('val').then(val => {
            cy.url().should('eq', val.trim());
        });

        productCategoryPage.getProductPriceList().then($list => {
            const productPriceArrayCopy = [...$list];
            const productPricesArraySorted = $list.sort((a, b) => a - b);
            expect(productPricesArraySorted).to.deep.equal(productPriceArrayCopy);
        });
    });

    it("validate sort by Price: High to Low", () => {
        const data = sortingData["sortByPriceHighToLow"];

        homePage.topMenu().openCategory(data.category, data.subCategory);
        productCategoryPage.sortProducts(productCategoryPage.elements.sortByPriceHtoL);

        productCategoryPage.elements.sortingDropdown().invoke('val').then(val => {
            cy.url().should('eq', val.trim());
        });

        productCategoryPage.getProductPriceList().then($list => {
            const productPriceArrayCopy = [...$list];
            const productPricesArraySorted = $list.sort((a, b) => b - a);
            expect(productPricesArraySorted).to.deep.equal(productPriceArrayCopy);
        });
    });
});