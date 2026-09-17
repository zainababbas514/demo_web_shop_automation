import HomePage from "../pages/homePage";
import RegisterPage from "../pages/registerPage";
import RegisterResultPage from "../pages/registerResultPage";

const homePage = new HomePage();
const registerPage = new RegisterPage();
const registerResultPage = new RegisterResultPage();

let user;

describe("Registration", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    before(() => {
        // Load registration test data before the test runs.
        cy.fixture("registrationData").then((data) => {
            user = data;
        });
    });

    it("validate a new user can register", () => {
        homePage.header().click_header_link("Register");
        const email = `test_${Date.now()}@gmail.com`;

        // Wait for the registration page to load before entering user details.
        cy.waitForPageElement(registerPage.elements.pageHeading);

        registerPage.selectGender(user.gender);
        registerPage.enterFirstName(user.firstName);
        registerPage.enterLastName(user.lastName);
        registerPage.enterEmail(email);
        registerPage.enterPassword(user.password);
        registerPage.enterConfirmPassword(user.password);
        registerPage.clickRegisterButton();

        // Verify that the registration was completed successfully.
        registerResultPage.elements.success_message()
            .should('be.visible')
            .and("contain.text", "Your registration completed")

        // Verify that the user is logged in automatically after registration.
        homePage.header().elements.header_links()
            .contains("Log out")
            .should("be.visible");

        homePage.header().elements.header_links()
            .contains(email)
            .should("be.visible");
    });
});