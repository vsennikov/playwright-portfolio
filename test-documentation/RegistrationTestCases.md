# Test Cases for Registration Page

This document outlines the test cases for the user registration page, designed to verify its functionality, validation logic, and error handling.

## 1. Positive Scenarios (Happy Path)

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-REG-001** | Successful registration with all valid data | 1. Navigate to the registration page.<br>2. Fill all fields with valid, unique data.<br>3. Enter a valid password (e.g., `ValidPass123!`).<br>4. Click the "Register" button. | 1. User is successfully registered.<br>2. User is redirected to the "Login" page.<br>3. A success message is displayed. |


## 2. Negative Scenarios (Validation & Business Logic)

### Empty Field Validation

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-REG-002** | Attempt registration with all empty fields | 1. Navigate to the registration page.<br>2. Click the "Register" button. | 1. Registration fails.<br>2. Validation error messages (e.g., "This field is required") are displayed under each mandatory field. |
| **TC-REG-003** | Attempt registration with one empty mandatory field (e.g., Email) | 1. Navigate to the registration page.<br>2. Fill all fields *except* for the Email field.<br>3. Click the "Register" button. | 1. Registration fails.<br>2. A validation error message is displayed specifically under the Email field. |

### Email Field Validation

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-REG-004** | Attempt registration with invalid email format (no "@") | 1. Fill the Email field with `test.user.com`.<br>2. Fill all other fields correctly.<br>3. Click the "Register" button. | 1. Registration fails.<br>2. A validation message (e.g., "Please enter a valid email address") is displayed. |
| **TC-REG-005** | Attempt registration with invalid email format (no domain) | 1. Fill the Email field with `test.user@test`.<br>2. Fill all other fields correctly.<br>3. Click the "Register" button. | 1. Registration fails.<br>2. A validation message (e.g., "Please enter a valid email address") is displayed. |

### Password Validation (Equivalence Partitioning & Boundary Value)

*(Rules: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)*

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-REG-006** | **[Invalid Partition]** Password too short (Boundary) | 1. Enter a password of 7 characters (e.g., `Pass123!`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "Be at least 8 characters long." |
| **TC-REG-007** | **[Valid Partition]** Password at minimum length (Boundary) | 1. Enter a password of 8 characters (e.g., `Pass123!`).<br>2. Confirm the password.<br>3. Fill all other fields correctly and uniquely.<br>4. Click "Register". | 1. Registration is **successful**. |
| **TC-REG-008** | **[Invalid Partition]** Password missing uppercase letter | 1. Enter a password (e.g., `validpass123!`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "Contain both uppercase and lowercase letters." |
| **TC-REG-009** | **[Invalid Partition]** Password missing lowercase letter | 1. Enter a password (e.g., `VALIDPASS123!`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "Contain both uppercase and lowercase letters." |
| **TC-REG-010** | **[Invalid Partition]** Password missing number | 1. Enter a password (e.g., `ValidPass!`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "Include at least one number." |
| **TC-REG-011** | **[Invalid Partition]** Password missing special character | 1. Enter a password (e.g., `ValidPass123`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "Have at least one special symbol." |

### Form Logic Validation

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-REG-012** | Attempt registration with an existing email | 1. Fill the Email field with an email already in the database (e.g., `customer@practicesoftwaretesting.com`).<br>2. Fill all other fields correctly.<br>3. Click "Register". | 1. Registration fails.<br>2. Error message: "An account with this email already exists." |