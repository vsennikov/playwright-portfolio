# Test Cases for API

This document outlines the test cases for the Toolshop REST API (`https://api.practicesoftwaretesting.com`), covering user management, product search, and shopping cart functionality.

**Pre-conditions:**
* API base URL: `https://api.practicesoftwaretesting.com`
* All requests use JSON content type
* Unique email addresses are generated for each test run to avoid conflicts

## 1. User Management

### User Registration

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-API-001** | Successful user registration | 1. Generate a unique email address (e.g., `playwright_api_{timestamp}_{random}@example.com`).<br>2. Prepare user data with valid password meeting requirements (min 8 chars, uppercase, lowercase, number, special symbol, e.g., `Welcome123!`).<br>3. Send `POST /users/register` request with user data (first_name, last_name, email, password, dob). | 1. Response status code is `201 Created`.<br>2. Response body contains `id` field (string).<br>3. Response body contains user data (first_name, last_name, email).<br>4. User `id` is not empty. |

### User Authentication

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-API-002** | Successful user login and token retrieval | 1. Create a new user via `POST /users/register` with valid credentials.<br>2. Send `POST /users/login` request with email and password from step 1. | 1. Response status code is `200 OK`.<br>2. Response body contains `access_token` (string, non-empty).<br>3. Response body contains `token_type` with value `"Bearer"`.<br>4. Response body contains `expires_in` (number). |

## 2. Product Search & Filtering

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-API-003A** | Sort products by price descending | 1. Send `GET /products` request with query parameter `sort=price,desc`. | 1. Response status code is `200 OK`.<br>2. Response body contains paginated product data.<br>3. If at least 2 products exist, the price of the first product is greater than or equal to the price of the second product (descending order). |
| **TC-API-003B** | Filter products by price range | 1. Send `GET /products` request with query parameter `between=price,1,50` (or similar range). | 1. Response status code is `200 OK`.<br>2. Response body contains paginated product data.<br>3. All returned products have a `price` value within the specified range (inclusive).<br>4. Each product price is greater than or equal to the minimum and less than or equal to the maximum. |

## 3. Shopping Cart Flow

| ID | Title | Steps to Reproduce | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-API-004** | Create cart and add item to cart | 1. Send `POST /carts` request to create a new cart session.<br>2. Capture the `id` from the response.<br>3. Fetch a valid `product_id` from `GET /products` (or use example product ID if none available).<br>4. Send `POST /carts/{id}` request with payload containing `product_id` and `quantity`. | 1. Cart creation returns status code `201 Created`.<br>2. Cart creation response contains `id` field (string, non-empty).<br>3. Item addition returns status code `200 OK`.<br>4. Item addition response contains `result` field indicating success (e.g., "item added or updated"). |

