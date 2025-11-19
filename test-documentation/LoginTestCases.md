# Test Cases for Login Page

This document outlines the test cases for the user login page (`/auth/login`), covering positive flows, validation logic, and UI features.

**Pre-conditions:**
* The user has navigated to `https://practicesoftwaretesting.com/auth/login`.
* **A user account has been successfully created** (as per *TC-REG-001* from the Registration Page tests).
* The tester has the valid email and password used during that registration.

## 1. Positive Scenarios (Happy Path)

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-LOG-001** | Successful login with valid credentials | 1. Enter the **email address** used in registration.<br>2. Enter the **password** used in registration.<br>3. Click the "Login" button. | 1. Login is successful.<br>2. User is redirected to the "My Account" page.<br>3. The page title or header contains "My account". |
| **TC-LOG-002** | Login with email case insensitivity | 1. Enter the registered **email address in UPPERCASE** (e.g., `USER@TEST.COM`).<br>2. Enter the valid password.<br>3. Click the "Login" button. | 1. Login is successful (emails should be case-insensitive).<br>2. User is redirected to the "My Account" page. |

## 2. Negative Scenarios (Error Handling)

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-LOG-003** | Login with invalid password | 1. Enter the valid registered email address.<br>2. Enter an **incorrect password** (e.g., `WrongPass123!`).<br>3. Click the "Login" button. | 1. Login fails.<br>2. Error message "Invalid email or password" is displayed. |
| **TC-LOG-004** | Login with non-registered email | 1. Enter a non-existent email (e.g., `random.user.999@test.com`).<br>2. Enter any password.<br>3. Click the "Login" button. | 1. Login fails.<br>2. Error message "Invalid email or password" is displayed. |
| **TC-LOG-005** | Login with empty fields | 1. Leave "Email" and "Password" fields empty.<br>2. Click the "Login" button. | 1. Login fails.<br>2. Validation messages (e.g., "Email is required", "Password is required") are displayed. |
| **TC-LOG-006** | Login with invalid email format | 1. Enter invalid email format (e.g., `user.com` or `user@`).<br>2. Enter any password.<br>3. Click the "Login" button. | 1. Login fails.<br>2. Browser or inline validation message indicates an invalid email format. |

## 3. UI & Functional Features

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-LOG-007** | Toggle password visibility ("Eye" icon) | 1. Enter text in the Password field.<br>2. Observe the input type (masked by default).<br>3. Click the "Eye" icon inside the password field.<br>4. Click the icon again. | 1. Initially, the password is masked (bullets/dots).<br>2. After the first click, the password text is visible.<br>3. After the second click, the password is masked again. |
| **TC-LOG-008** | Verify "Sign in with Google" button presence | 1. Observe the login form. | 1. The "Sign in with Google" button is visible and clickable.<br>*(Note: Full authentication flow via Google is out of scope due to bot protection).* |
| **TC-LOG-009** | Navigation to "Forgot Password" page | 1. Click the "Forgot your Password?" link. | 1. User is redirected to the `/auth/forgot-password` page.<br>2. The page header displays "Forgot Password". |
| **TC-LOG-010** | Navigation to "Registration" page | 1. Click the "Register your account" link. | 1. User is redirected to the `/auth/register` page.<br>2. The page header displays "Customer registration". |