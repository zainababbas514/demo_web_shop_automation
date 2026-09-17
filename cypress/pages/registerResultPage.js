class RegisterResultPage {
    elements = {
        success_message: () => cy.get(".registration-result-page .result")
    }
}

export default RegisterResultPage;