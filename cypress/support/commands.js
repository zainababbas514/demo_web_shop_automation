// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import ProductDetailPage from "../pages/productDetailPage";
import CartPage from "../pages/cartPage";
import ProductListingPage from "../pages/productListingPage";

const productPage = new ProductListingPage();
const productDetailPage = new ProductDetailPage()
const homePage = new HomePage();
const loginPage = new LoginPage();
const cartPage = new CartPage();

Cypress.Commands.add("waitForPageElement", (selector) => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add("login", (email, password) => {
    loginPage.login(email, password)
})

Cypress.Commands.add("addProductsToCart", (products) => {
    const collectedProducts = [];
    let expectedCartCount = 0;

    return cy.wrap(products).each(product => {

        if (product.category) {
            homePage.topMenu().openCategory(product.category, product.subCategory)
            cy.waitForPageElement(productPage.elements.pageTitle)
        }

        homePage.productCard().clickAddToCartButton(product.name);

        if (product.type !== "") {
            productDetailPage.applyConfiguration(product.type, product.selections);

            productDetailPage.getProductDetails(product.name).then(detail => {
                collectedProducts.push(detail);
                expectedCartCount += parseInt(detail.qty);
            });

            homePage.header().clickHeaderLogo();
            cy.url().should("eq", `${Cypress.config("baseUrl")}`);
        } else {
            homePage.header().verifyAddToCartSuccessMessage()
            homePage.productCard().getProductDetails(product.name).then(detail => {
                collectedProducts.push(detail);
                expectedCartCount += parseInt(detail.qty);
            });
        }
    }).then(() => ({
        products: collectedProducts,
        cartCount: expectedCartCount
    }));
})