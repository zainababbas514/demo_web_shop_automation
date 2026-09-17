import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginPage";

const homePage = new HomePage();
const loginPage = new LoginPage();

// Load fixture data for invalid credentials
const loginData = require("../fixtures/loginData.json");

describe("Login", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("login with valid credentials", () => {
        // Retrieve valid credentials from environment variables
        const validEmail = Cypress.env("testEmail");
        const validPassword = Cypress.env("testPassword");

        homePage.header().click_header_link("Log in");
        cy.waitForPageElement(loginPage.elements.login_heading);
        
        cy.login(validEmail, validPassword);
        
        // Verify that the user is successfully logged in.
        homePage.header().elements.header_links()
            .contains("Log out")
            .should("be.visible");

        homePage.header().elements.header_links()
            .contains(validEmail)
            .should("be.visible");
            });

    loginData.invalid_credentials.forEach((user) => {
        it(`login with invalid credentials - ${user.email || 'empty email'}`, () => {
            homePage.header().click_header_link("Log in");
            cy.waitForPageElement(loginPage.elements.login_heading);
            
            cy.login(user.email, user.password);

            loginPage.elements.login_error_message()
            .should("be.visible")
            .and("contain", "Login was unsuccessful.");

            cy.url().should("include", "login");
        });
    });
});