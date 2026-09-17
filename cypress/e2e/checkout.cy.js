import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";
import CheckoutSuccessPage from "../pages/checkoutSuccessPage";

const homePage = new HomePage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const checkoutSuccessPage = new CheckoutSuccessPage();

let checkoutData;

describe("Test Cart Functionality", () => {

    before(() => {
        cy.fixture("checkoutData").then((data) => {
            checkoutData = data;
        });
    });

    beforeEach(() => {
        cy.visit("/");

        const email = Cypress.env("testEmail");
        const password = Cypress.env("testPassword");

        homePage.header().click_header_link("Log in");
        cy.login(email, password);
    });

    it("validate user can place an order", () => {
        const testData = checkoutData["validCheckoutScenario"];

        // Add the products required for the test.
        cy.addProductsToCart(testData.productDetails);

        // Open the shopping cart and update product quantities.
        homePage.header().clickShoppingCartOption();

        // Verify that clicking the cart option navigates to the shopping cart.
        cy.url().should("include", "cart");

        cy.wrap(testData.productDetails).each((product) => {
            cartPage.changeCartQuantity(product.name, product.qty);
        });

        // Wait for the cart update request to complete before verifying the updated totals.
        cy.intercept("POST", "**/cart").as("updateCart");

        cartPage.clickUpdateCartBtn();
        cy.wait("@updateCart");

        // Verify that each product subtotal is calculated correctly.
        cartPage.elements.cartTotalItems()
            .each(($item) => {
                const unitPrice = parseFloat(
                    $item.find(cartPage.elements.productUnitPrice).text()
                );

                const quantity = Number(
                    $item.find(cartPage.elements.quantity).val()
                );

                const subtotal = unitPrice * quantity;

                const name = $item.find(
                    cartPage.elements.productName
                ).text();

                cartPage.elements.cartTotalItems()
                    .contains(name)
                    .closest(".cart-item-row")
                    .find(cartPage.elements.productUnitTotal)
                    .should("have.text", subtotal.toFixed(2));
            });

        // Verify that the calculated cart total matches the displayed total.
        cartPage.getCalculatedCartTotal().then((calculatedTotal) => {
            cartPage.getCartValueByLabel("Total:").then((actualTotal) => {
                expect(actualTotal).to.equal(calculatedTotal);
            });
        });

        // Proceed to checkout.
        cartPage.selectCountry(testData.country);
        cartPage.selectState(testData.state);
        cartPage.checkTermsConditions();
        cartPage.clickCheckoutBtn();

        checkoutPage.clickContinueButton(checkoutPage.elements.billingAddressContinueButton)

        // Continue to shipping address.
        checkoutPage.clickContinueButton(
            checkoutPage.elements.shippingAddressContinueButton
        );

        // Select shipping method and continue.
        checkoutPage.selectShippingMethod(testData.deliveryMethod);
        checkoutPage.clickContinueButton(
            checkoutPage.elements.shippingMethodContinueButton
        );

        // Select payment method and continue.
        checkoutPage.selectPaymentMethod(testData.paymentMethod);
        checkoutPage.clickContinueButton(
            checkoutPage.elements.paymentMethodContinueButton
        );

        // Continue through payment information and confirm the order.
        checkoutPage.clickContinueButton(
            checkoutPage.elements.paymentInfoContinueButton
        );

        checkoutPage.clickContinueButton(
            checkoutPage.elements.confirmOrderButton
        );

        // Verify that the order was successfully placed.
        checkoutSuccessPage.elements.successMessage()
            .should("be.visible")
            .and("have.text", "Your order has been successfully processed!");
    });
});
