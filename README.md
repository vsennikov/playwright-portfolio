# Playwright Portfolio Project

Portfolio project built with Playwright, demonstrating automated testing capabilities for web applications and REST APIs. This project showcases UI testing, API testing and best practices in test automation using TypeScript and the Page Object Model pattern.

## 🚀 Features

- **UI Testing**: Comprehensive test coverage for login and registration flows
- **API Testing**: REST API testing with user registration, authentication, product search and cart management
- **Page Object Model**: Clean and maintainable test structure using POM pattern
- **Multiple Browsers**: Support for Chromium, Firefox, WebKit, and mobile browsers (Chrome Mobile, Safari Mobile)
- **Test Reporting**: Integrated Allure reporting for detailed test results and history
- **CI/CD**: GitHub Actions workflow for automated test execution
- **TypeScript**: Type-safe test code with full TypeScript support
- **Data Generation**: Uses Faker.js for generating test data

## 🛠️ Tech Stack

- **[Playwright](https://playwright.dev/)**: End-to-end testing framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Allure Report](https://allurereport.org/)**: Test reporting framework
- **[Faker.js](https://fakerjs.dev/)**: Test data generation library

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vsennikov/playwright-portfolio.git
   cd playwright-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

   Or install with system dependencies:
   ```bash
   npx playwright install --with-deps
   ```

## 🏗️ Project Structure

```
playwright-portfolio/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD workflow
├── pages/
│   ├── components/
│   │   └── BasePage.ts             # Base page class
│   ├── LoginPage.ts                # Login page object
│   └── RegistrationPage.ts         # Registration page object
├── tests/
│   ├── api.spec.ts                 # API test suite
│   ├── login.spec.ts               # Login page tests
│   ├── registration.spec.ts        # Registration page tests
│   ├── apiUtils/
│   │   ├── models.ts               # API request/response types
│   │   └── utils.ts                # API utility functions
│   └── utils/
│       └── credentials.ts          # Credential management
├── test-documentation/
│   ├── APITestCases.md             # API test case documentation
│   ├── LoginTestCases.md           # Login test case documentation
│   └── RegistrationTestCases.md    # Registration test case documentation
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## ▶️ Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

### Run Tests in Headed Mode (Visible Browser)

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

### Run Tests on Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

## 📊 Test Reports

### Generate Allure Report

```bash
npm run allure:generate
```

### Open Allure Report

```bash
npm run allure:open
```

### Serve Allure Report (Live)

```bash
npm run allure:serve
```

The Allure reports are also automatically generated and deployed to GitHub Pages via CI/CD pipeline. Check the latest test results in the repository's GitHub Pages.

## 🎯 Test Coverage

### UI Tests

#### Login Page Tests (`tests/login.spec.ts`)
- ✅ Successful login with valid credentials
- ✅ Email case insensitivity
- ✅ Invalid password handling
- ✅ Non-registered email validation
- ✅ Empty fields validation
- ✅ Invalid email format validation
- ✅ Password visibility toggle
- ✅ Navigation to registration page
- ✅ Navigation to forgot password page
- ✅ Google login button presence

#### Registration Page Tests (`tests/registration.spec.ts`)
- ✅ Successful registration with valid data
- ✅ Field validation (email, password, first name, last name, etc.)
- ✅ Password requirements validation
- ✅ Email format validation
- ✅ Minimum password length validation

### API Tests (`tests/api.spec.ts`)

#### User Management
- ✅ User Registration (`POST /users/register`)
- ✅ User Login (`POST /users/login`)

#### Product Search & Filtering
- ✅ Sort products by price (ascending/descending)
- ✅ Filter products by price range

#### Shopping Cart
- ✅ Create shopping cart (`POST /carts`)
- ✅ Add items to cart (`POST /carts/{id}/items`)

## 🔧 Configuration

### Playwright Configuration

The project uses `playwright.config.ts` for configuration. Key settings:

- **Base URL**: `https://practicesoftwaretesting.com`
- **Test Directory**: `./tests`
- **Retries**: 2 retries on CI, 0 locally
- **Reporters**: Allure Playwright reporter
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

### Test Environment

Tests are configured to run against the Practice Software Testing demo site:
- **UI Base URL**: `https://practicesoftwaretesting.com`
- **API Base URL**: `https://api.practicesoftwaretesting.com`

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Runs tests on push/PR to `main` branch
2. Executes tests on Ubuntu latest with Node.js LTS
3. Generates Allure reports
4. Deploys test reports to GitHub Pages
5. Maintains report history (last 20 reports)

## 📚 Test Documentation

Detailed test case documentation is available in the `test-documentation/` directory:

- `APITestCases.md`: Complete API test case specifications
- `LoginTestCases.md`: Login page test scenarios
- `RegistrationTestCases.md`: Registration page test scenarios

## 🎨 Page Object Model (POM)

This project follows the Page Object Model pattern for better maintainability:

- `BasePage`: Base class with common page methods
- `LoginPage`: Encapsulates login page elements and actions
- `RegistrationPage`: Encapsulates registration page elements and actions


