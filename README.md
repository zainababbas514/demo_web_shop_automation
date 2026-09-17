# Demo Web Shop Cypress Automation

A Cypress-based test automation project for testing the **Demo Web Shop** application using JavaScript and the Page Object Model (POM).

## 🧪 Project Overview

This project automates key e-commerce workflows of the Demo Web Shop application, including user registration and login, product display, product search, product filtering, product sorting, shopping cart management, and checkout.

The framework is designed with reusable Page Objects, shared page components, Cypress custom commands, external JSON test data, environment variables, assertions, screenshots, and Mochawesome reporting.

This project is created as part of a QA automation portfolio to demonstrate practical Cypress and JavaScript automation skills.

## 🛠️ Tech Stack

* **JavaScript**
* **Cypress**
* **Page Object Model (POM)**
* **Mochawesome**
* **JSON**
* **Cypress Custom Commands**
* **dotenv**
* **Git / GitHub**

## 📋 Test Coverage

The automation suite covers the following functional areas:

* User registration
* User login with valid and invalid credentials
* Login field validation
* Product display
* Product search
* Product filtering by price
* Product sorting by name
* Product sorting by price
* Adding featured products to the shopping cart
* Shopping cart validation
* Updating product quantities
* Checkout and order placement
* Order confirmation validation

Detailed manual test cases are maintained separately in the `cypress/testCases` folder.

## ✨ Framework Features

* Page Object Model for reusable and maintainable test code
* Reusable page components for common UI elements
* Cypress custom commands for common workflows
* JSON fixtures for external test data
* Environment variables for sensitive test credentials
* `.env.example` template for project configuration
* Reusable product and shopping cart workflows
* Assertions maintained in test files
* `cy.intercept()` for request/response validation where required
* Automatic screenshots on test failure
* Cypress video recording
* Mochawesome HTML reporting
* Cypress built-in waiting and retryability
* Configurable application `baseUrl`
* Git/GitHub for version control

## 📁 Project Structure

```text
DemoWebShopTests
├─ cypress
│  ├─ e2e
│  │  ├─ checkout.cy.js
│  │  ├─ login.cy.js
│  │  ├─ productDisplay.cy.js
│  │  ├─ productFiltering.cy.js
│  │  ├─ productSorting.cy.js
│  │  ├─ registration.cy.js
│  │  └─ shoppingCart.cy.js
│  │
│  ├─ fixtures
│  │  ├─ checkoutData.json
│  │  ├─ loginData.json
│  │  ├─ productDisplay.json
│  │  ├─ productFilterData.json
│  │  ├─ productSortingData.json
│  │  ├─ registrationData.json
│  │  └─ shoppingCartData.json
│  │
│  ├─ pages
│  │  ├─ cartPage.js
│  │  ├─ checkoutPage.js
│  │  ├─ checkoutSuccessPage.js
│  │  ├─ components
│  │  │  ├─ header.js
│  │  │  └─ topMenu.js
│  │  ├─ homePage.js
│  │  ├─ loginPage.js
│  │  ├─ productCard.js
│  │  ├─ productDetailPage.js
│  │  ├─ productListingPage.js
│  │  ├─ registerPage.js
│  │  ├─ registerResultPage.js
│  │  └─ searchPage.js
│  │
│  ├─ support
│  │  ├─ commands.js
│  │  └─ e2e.js
│  │
│  └─ testCases
│     └─ Demo_Web_Shop_Test_Cases.xlsx
│
├─ .env.example
├─ .gitignore
├─ cypress.config.js
├─ package-lock.json
├─ package.json
└─ README.md
```

> Generated folders such as `node_modules`, screenshots, videos, reports, and local environment files are excluded from version control through `.gitignore`.

## 🧩 Page Object Model

The project follows the **Page Object Model** to separate UI interaction logic from test cases.

Page Objects contain:

* Element locators
* Reusable UI actions
* Page-specific methods
* Common page interactions

This structure helps reduce duplication and makes the automation code easier to maintain.

## 🔄 Cypress Custom Commands

Reusable workflows are implemented in:

```text
cypress/support/commands.js
```

Examples include:

```javascript
cy.login()
```

and:

```javascript
cy.addProductsToCart()
```

Custom commands are used for workflows that are repeated across multiple tests.

For example, the `addProductsToCart()` command handles adding configured products and returns information about the products and expected cart quantity so that the test can perform the relevant assertions.

## 🧪 Test Data Management

Test data is maintained separately using Cypress fixtures:

```text
cypress/fixtures/
```

The project contains dedicated JSON files for different functional areas:

* `loginData.json`
* `registrationData.json`
* `productDisplay.json`
* `productFilterData.json`
* `productSortingData.json`
* `shoppingCartData.json`
* `checkoutData.json`

Separating test data from test logic makes the tests easier to maintain and allows test data to be updated without modifying the test implementation.

## 🔐 Environment Variables

The project uses environment variables to store sensitive test credentials instead of hardcoding them in the test code.

A `.env.example` file is included in the repository as a template:

```text
TEST_EMAIL=
TEST_PASSWORD=
```

The actual credentials are stored locally in a `.env` file.

### Setup

Create a `.env` file in the project root based on `.env.example`:

```text
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=your-password
```

The `.env` file is excluded from Git through `.gitignore`:

```text
.env
```

The `.env.example` file can safely be committed because it contains only the required variable names and no actual credentials.

> Never commit real credentials or other sensitive information to the repository.

The project uses `dotenv` to load the environment variables during test execution.

## 🌐 Network & API Validation

Where required, Cypress `cy.intercept()` is used to observe and validate application network requests and responses.

This allows the tests to validate relevant application behavior at the network level in addition to UI validation.

## 📊 Mochawesome Reporting

The project uses **Mochawesome** to generate HTML test reports.

Generated reports are stored in the configured Cypress reports directory and are excluded from version control through `.gitignore`.

Run the complete test suite:

```bash
npm run cy:run
```

## 📸 Screenshots & Videos

Cypress can capture screenshots when tests fail and record test execution videos when video recording is enabled.

Generated files are stored under:

```text
cypress/screenshots/
cypress/videos/
```

These generated files are excluded from Git through `.gitignore`.

## 📝 Test Case Documentation

Detailed manual test cases are maintained separately in:

```text
cypress/testCases/Demo_Web_Shop_Test_Cases.xlsx
```

## 🚀 Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd DemoWebShopTests
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```text
TEST_EMAIL=your-email@example.com
TEST_PASSWORD=your-password
```

## ▶️ Running Tests

The project provides npm scripts in `package.json` for common Cypress commands.

### Open Cypress in Interactive Mode

```bash
npm run cy:open
```

This opens the Cypress Test Runner, where individual test files can be selected and executed.

### Run the Complete Test Suite

```bash
npm run cy:run
```

You can also use the standard npm test command:

```bash
npm test
```

### Run Tests in Chrome

```bash
npm run test:chrome
```

### Run a Specific Spec

The `test:spec` script can be used to run any individual Cypress spec.

```bash
npm run test:spec -- cypress/e2e/login.cy.js
```

For example, to run the product sorting tests:

```bash
npm run test:spec -- cypress/e2e/productSorting.cy.js
```

To run the checkout tests:

```bash
npm run test:spec -- cypress/e2e/checkout.cy.js
```

The same `test:spec` command can be used with any spec file in the `cypress/e2e` directory.

### Available npm Scripts

The main scripts defined in `package.json` are:

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "test": "cypress run",
  "test:chrome": "cypress run --browser chrome",
  "test:spec": "cypress run --spec"
}
```

## 🌐 Application Under Test

**Demo Web Shop**

https://demowebshop.tricentis.com/

## 🌍 Browser Support

The project can be executed using Cypress-supported browsers such as:

* Chrome
* Edge
* Electron

For example:

```bash
npm run test:chrome
```

Other browsers can be selected directly through Cypress:

```bash
npx cypress run --browser edge
```

## 📌 Project Notes

This is a **test automation practice project** created to demonstrate practical skills in:

* Cypress
* JavaScript
* Page Object Model
* Test data management
* Custom Cypress commands
* Environment variable management
* UI assertions
* Network request validation
* Test reporting
* Git/GitHub
