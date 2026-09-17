import HomePage from "../pages/homePage";
import ProductPage from "../pages/productListingPage";

const homePage = new HomePage();
const productPage = new ProductPage();

let productData;

describe("Product Category", () => {

    before(() => {
        // Load the category data required for TC-001.
        cy.fixture("productDisplay").then((data) => {
            productData = data["categoryProductListing"];
        });
    });

    beforeEach(() => {
        cy.visit("/");
    });

    it("validate products display correctly when a category is opened", () => {
        homePage.topMenu().openCategory(productData.category);

        // Wait for the category page to load before verifying its products.
        cy.waitForPageElement(productPage.elements.pageTitle);

        productPage.elements.productList().each(($product) => {

            cy.wrap($product)
                .find(productPage.elements.productImage)
                .should("be.visible")
                .then(($img) => {
                    // Verify that the image was loaded successfully.
                    expect($img[0].naturalWidth).to.be.greaterThan(0);
                });

            cy.wrap($product)
                .find(productPage.elements.productName)
                .should("be.visible")
                .invoke("text")
                .then((text) => {
                    expect(text.trim()).to.not.be.empty;
                });

            cy.wrap($product)
                .find(productPage.elements.productPrice)
                .should("be.visible")
                .invoke("text")
                .then((text) => {
                    const price = parseFloat(text.trim());
                    expect(price).to.be.greaterThan(0);
                });
        });
    });
});