class LoginPage {
    elements = {
        email_input: () => cy.get("#Email"),
        password_input: () => cy.get("#Password"),
        login_button: () => cy.get(".login-button"),
        login_error_message: () => cy.get(".validation-summary-errors"),
        login_heading: ".login-page h1",
    };

    enterEmail(email) {
        if (email !== "") {
            this.elements.email_input()
                .clear()
                .type(email);
        }
    }

    enterPassword(password) {
        if (password !== "") {
            this.elements.password_input()
                .clear()
                .type(password);
        }
    }

    clickLoginButton() {
        this.elements.login_button().click();
    }

    login(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
    }

};

export default LoginPage;

