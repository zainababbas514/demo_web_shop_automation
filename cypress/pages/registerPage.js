class RegisterPage {
    elements = {
        genderRadios: () => cy.get("input[name='Gender']"),
        firstNameInput: () => cy.get("#FirstName"),
        lastNameInput: () => cy.get("#LastName"),
        emailInput: () => cy.get("#Email"),
        passwordInput: () => cy.get("#Password"),
        confirmPasswordInput: () => cy.get("#ConfirmPassword"),
        registerButton: () => cy.get("#register-button"),
        pageHeading: ".registration-page h1",
    };

    selectGender(value) {
        this.elements.genderRadios()
            .check(value)
            .should("be.checked");
    }

    enterFirstName(firstName) {
        this.elements.firstNameInput()
            .clear()
            .type(firstName);
    }

    enterLastName(lastName) {
        this.elements.lastNameInput()
            .clear()
            .type(lastName);
    }

    enterEmail(email) {
        this.elements.emailInput()
            .clear()
            .type(email);
    }

    enterPassword(password) {
        this.elements.passwordInput()
            .clear()
            .type(password);
    }

    enterConfirmPassword(confirmPassword) {
        this.elements.confirmPasswordInput()
            .clear()
            .type(confirmPassword);
    }

    clickRegisterButton() {
        this.elements.registerButton().click();
    }
}

export default RegisterPage;