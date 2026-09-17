import HomePage from "../pages/homePage";
import CartPage from "../pages/cartPage";

const homePage = new HomePage();
const cartPage = new CartPage();

let productData;

describe("Test Cart Functionality", () => {

    before(() => {
        // Load shopping cart test data once before the test suite starts.
        cy.fixture("shoppingCartData").then((data) => {
            productData = data;
        });
    });

    beforeEach(() => {
        cy.visit("/");
    });

    it("validate user can add featured products to cart", () => {
        const testData = productData["addFeaturedProductsToCart"];

        cy.addProductsToCart(testData).then((info) => {
            const productDetail = info.products;
            const expectedCartCount = info.cartCount;

            // Verify that the cart count matches the number of products added.
            homePage.header().checkCartQuantity(expectedCartCount);

            homePage.header().clickShoppingCartOption();

            // Verify that clicking the cart option navigates to the shopping cart.
            cy.url().should("include", "cart");

            // Get the products currently displayed in the cart.
            cartPage.getCartProductsList().then((actualCartProducts) => {

                // Verify that all expected products are displayed in the cart.
                productDetail.forEach((expected) => {
                    const actual = actualCartProducts.find(
                        (product) => product.name === expected.name
                    );

                    expect(actual, `Product "${expected.name}" should be in the cart`).to.exist;
                    expect(actual.name).to.equal(expected.name);
                    expect(actual.qty).to.equal(expected.qty);
                });
            });
        });
    });

    it("validate user can update quantity of a product in the cart", () => {
        const testData = productData["updateCartProductQuantity"];

        cy.addProductsToCart(testData);

        homePage.header().clickShoppingCartOption();

        // Verify that clicking the cart option navigates to the shopping cart.
        cy.url().should("include", "cart");

        // Update the quantity for each product defined in the test data.
        cy.wrap(testData).each(($el) => {
            cartPage.changeCartQuantity($el.name, $el.qty);
        });

        // Wait for the cart update request to complete before verifying the totals.
        cy.intercept(
            "POST",
            Cypress.config("baseUrl") + "cart"
        ).as("cart");

        cartPage.clickUpdateCartBtn();
        cy.wait("@cart");

        // Verify that each product subtotal is calculated correctly.
        const priceList = [];

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

                priceList.push(subtotal.toFixed(2));
            });
    });
});